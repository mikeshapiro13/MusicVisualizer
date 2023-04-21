const express = require("express");
const bodyParser = require("body-parser");
const oracledb = require("oracledb");

const app = express();
const port = 3000;

// middleware
app.use(bodyParser.json());

// connect to Oracle database
oracledb.getConnection(
  {
    user: "kyle.hoang",
    password: "9rfIUbwkC1ypweydgbnA3Ln8",
    connectString: "oracle.cise.ufl.edu:1521/orcl",
  },
  (err, connection) => {
    if (err) {
      console.error(err.message);
      return;
    }
    console.log("Connected to Oracle database");

    // login route
    app.post("/query/login", async (req, res) => {
      try {
        const username = req.body.username;
        const password = req.body.password
    
        console.log(username, password)
        // execute the SQL query with the user input
        const result = await connection.execute(
          'SELECT * FROM Users WHERE username = :username AND password = :password',
          [username, password]
        );
    
        // check if the query returned any results
        if (result.rows.length === 1) {
          // User exists in database and credentials are correct
          res.json({ message: 'Login successful' });
        } else {
          // User does not exist in database or credentials are incorrect
          res.status(401).json({ message: 'Invalid credentials' });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      }
    });

    // set up routes
    app.get("/query:id/:start?/:end?/:country?/:name?/:t?", (req, res) => {
      const queryId = req.params.id;
      let query;
      const startYear = req.params.start || 2014;
      const endYear = req.params.end || 2020;
      switch (queryId) {
        
        case "1":

          query = `WITH Weeks AS (
            SELECT 
              EXTRACT(YEAR FROM dateCharted) AS chart_year,
              TO_NUMBER(TO_CHAR(dateCharted, 'IW')) AS chart_week,
              AVG(streams) AS average_streams
            FROM 
              ChartedSong
            WHERE
              EXTRACT(YEAR FROM dateCharted) BETWEEN :startYear AND :endYear
            GROUP BY
              EXTRACT(YEAR FROM dateCharted),
              TO_NUMBER(TO_CHAR(dateCharted, 'IW'))
          )
          SELECT
            chart_year,
            chart_week,
            average_streams
          FROM
            Weeks
          ORDER BY
            chart_year,
            chart_week
          `;
          executeQuery(query, { startYear, endYear }, (err, rows) => {
            if (err) {
              res.status(err).send(rows);
            } else {
              res.send(rows);
            }
          });
          break;
        case "2":
          const country1 = req.query.country;
          query = `
          SELECT a.year, noGenres, noArtists, (noGenres / noArtists) AS genresPerArtist
            FROM (SELECT extract(year from datecharted) AS year, count(distinct aID) AS noArtists
                  FROM chartedsong natural join artistsongs natural join artistgenres
                  WHERE countryCharted = :country1
                  GROUP BY extract(year from datecharted)
                  ORDER BY year asc) a,
              (SELECT extract(year from datecharted) AS year, count(distinct name) AS noGenres
                  FROM chartedsong natural join artistsongs natural join artistgenres
                  WHERE countryCharted = :country1
                  GROUP BY extract(year from datecharted)
                  ORDER BY year asc) b
          WHERE a.year = b.year`;
          executeQuery(query, { country1 }, (err, rows) => {
            if (err) {
              res.status(err).send(rows);
            } else {
              res.send(rows);
            }
          });
          break;
        case "3":
          const country = req.query.country;
          query = `select a.year, uspop, foreignPop, (uspop / foreignpop) as usInfluence
          from 
              (select year, count(a.sid) as usPop
              from (select extract(year from datecharted) as year, sID
              from chartedsong
              where countrycharted = :country) a,
              (select distinct sID
              from chartedSong
              where countryCharted = 'us') b
              where a.sID = b.sID
              group by year
              order by year asc) a,
              (select year, count(sid) as foreignPop
              from (
                  select extract(year from datecharted) as year, sID
                  from chartedsong
                  where countrycharted = :country)
              group by year
              order by year asc) b
          where a.year = b.year`;
          executeQuery(query, { country }, (err, rows) => {
            if (err) {
              res.status(err).send(rows);
            } else {
              res.send(rows);
            }
          });
          break;
        case "4":
          const starter = req.params.start || 2014;
          const ender = req.params.end || 2020;
          query = `
              SELECT 
                EXTRACT(YEAR FROM cs.dateCharted) AS year,
                TO_NUMBER(TO_CHAR(cs.dateCharted, 'IW')) AS yearWeek, 
                AVG(si.musicIndex) AS avgMusicIndex
              FROM ChartedSong cs
              JOIN (
                  SELECT sID, AVG(energy + songKey + songMode + acousticness + speechiness + valence + tempo + duration + timeSignature) AS musicIndex
                  FROM Song
                  GROUP BY sID
              ) si ON cs.sID = si.sID
              WHERE EXTRACT(YEAR FROM cs.dateCharted) BETWEEN :starter AND :ender
              GROUP BY EXTRACT(YEAR FROM cs.dateCharted), TO_NUMBER(TO_CHAR(cs.dateCharted, 'IW'))
              ORDER BY year 
          `;
          executeQuery(query, { starter, ender }, (err, rows) => {
            if (err) {
              res.status(err).send(rows);
            } else {
              res.send(rows);
            }
          });
          break;
        case "5":
          const selectedCo = req.query.name;
          query = `
              SELECT 
                  s.year AS song_year,
                  AVG(s.tempo) AS avg_tempo
              FROM 
                  Song s
                  JOIN ChartedSong cs ON s.sID = cs.sID
                  JOIN ArtistSongs asg ON s.sID = asg.sID
                  JOIN Artist a ON asg.aID = a.aID
              WHERE 
                  s.year BETWEEN 2014 AND 2020
                  AND cs.countryCharted = :selectedCo
                  AND a.aID IN (
                      SELECT aID 
                      FROM (
                          SELECT aID, COUNT(*) AS num_songs
                          FROM ArtistSongs 
                          GROUP BY aID
                          HAVING COUNT(*) >= 5
                      )
                  )
              GROUP BY
                  s.year
              ORDER BY 
                  song_year ASC 
          `;
          executeQuery(query, { selectedCo }, (err, rows) => {
            if (err) {
              res.status(err).send(rows);
            } else {
              res.send(rows);
            }
          });
          break;
        case "6":
          const selectedTempo = req.query.t;
          //ratios of distinct artist in top 50 vs distinct artist in genreal who make music
          //greater than or less than a user inputted tempo over time (values for each)

          //Useful to measure top heaviness in the chart in comparison to the tempo.
          //The general trend that can be seen is that the higher the tempo within reason, the more likely
          //a that tempo is to be top heavy in its charts distrubution

          query = `
          WITH ratio_query_greater_than AS (
            SELECT t1.year, (t2.num_of_unique_t50/t1.num_of_unique) as ratio
            FROM (
              SELECT s.year AS year, COUNT(DISTINCT a.aID) as num_of_unique
              FROM Artist a
              JOIN ArtistSongs aso ON a.aID = aso.aID
              JOIN Song s ON s.sID = aso.sID 
              WHERE s.tempo < :selectedTempo
              GROUP BY s.year
            ) t1
            INNER JOIN (
              SELECT EXTRACT(YEAR FROM cs.dateCharted) AS year, COUNT(DISTINCT a.aID) as num_of_unique_t50
              FROM Artist a
              JOIN ArtistSongs aso ON a.aID = aso.aID
              JOIN ChartedSong cs ON cs.sID = aso.sID
              JOIN Song s ON aso.sID = s.sID
              WHERE s.tempo < :selectedTempo
              GROUP BY EXTRACT(YEAR FROM cs.dateCharted)
            ) t2 ON t1.year = t2.year
          ),
          ratio_query_lower_than AS (
            SELECT t1.year, (t2.num_of_unique_t50/t1.num_of_unique) as ratio
            FROM (
              SELECT s.year AS year, COUNT(DISTINCT a.aID) as num_of_unique
              FROM Artist a
              JOIN ArtistSongs aso ON a.aID = aso.aID
              JOIN Song s ON s.sID = aso.sID 
              WHERE s.tempo > :selectedTempo
              GROUP BY s.year
            ) t1
            INNER JOIN (
              SELECT EXTRACT(YEAR FROM cs.dateCharted) AS year, COUNT(DISTINCT a.aID) as num_of_unique_t50
              FROM Artist a
              JOIN ArtistSongs aso ON a.aID = aso.aID
              JOIN ChartedSong cs ON cs.sID = aso.sID
              JOIN Song s ON aso.sID = s.sID
              WHERE s.tempo > :selectedTempo
              GROUP BY EXTRACT(YEAR FROM cs.dateCharted)
            ) t2 ON t1.year = t2.year
          )
          SELECT rq1.year, rq1.ratio as ratio1, rq2.ratio as ratio2
          FROM ratio_query_lower_than rq1
          JOIN ratio_query_greater_than rq2 ON rq1.year = rq2.year
          ORDER BY rq1.year ASC
          `;
          
          executeQuery(query, { selectedTempo }, (err, rows) => {
            if (err) {
              res.status(err).send(rows);
            } else {
              res.send(rows);
            }
          });
          break;
        case "tuples":
          query = `
            SELECT COUNT(*) AS total_tuples
            FROM ChartedSong
            UNION ALL
            SELECT COUNT(*) AS total_tuples
            FROM Artist
            UNION ALL
            SELECT COUNT(*) AS total_tuples
            FROM ArtistSongs
            UNION ALL
            SELECT COUNT(*) AS total_tuples
            FROM Genre
            UNION ALL
            SELECT COUNT(*) AS total_tuples
            FROM artistGenres
            UNION ALL
            SELECT COUNT(*) AS total_tuples
            FROM Song          
          `;
          executeQuery(query, { }, (err, rows) => {
            if (err) {
              res.status(err).send(rows);
            } else {
              res.send(rows);
            }
          });
          break;
        default:
          res.status(404).send("Invalid query");
          return;
      }

      // call query function
      function executeQuery(query, bindParams, callback) {
        connection.execute(query, bindParams, (err, result) => {
          if (err) {
            console.error(err.message);
            callback(500, "Internal server error");
            return;
          }
          callback(null, result.rows);
        });
      }
    });

    // start the server
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  }
);

/*
            SELECT COUNT(DISTINCT a.aID) as num_of_artist_in_t50, EXTRACT(YEAR FROM cs.dateCharted)  AS year
            FROM Artist a
            JOIN ArtistSongs aso ON a.aID = aso.aID
            JOIN ChartedSong cs ON cs.sID = aso.sID
            GROUP BY cs.dateCharted 


                      SELECT EXTRACT(YEAR FROM cs.dateCharted) AS year, COUNT(DISTINCT a.aID)
            FROM Artist a
            JOIN ArtistSongs aso ON a.aID = aso.aID
            JOIN ChartedSong cs ON cs.sID = aso.sID
            GROUP BY EXTRACT(YEAR FROM cs.dateCharted)
          
          
          
          
            SELECT t1.year, (t2.num_of_unique_t50/t1.num_of_unique) as ratio, t3.avg_tempo
            FROM (
              SELECT s.year AS year, COUNT(DISTINCT a.aID) as num_of_unique
              FROM Artist a
              JOIN ArtistSongs aso ON a.aID = aso.aID
              JOIN Song s ON s.sID = aso.sID
              JOIN ArtistGenres ag ON ag.aID = a.aID
              JOIN Genre g ON ag.name = g.name AND g.name='rap'
              GROUP BY s.year
            ) t1
            INNER JOIN (
              SELECT EXTRACT(YEAR FROM cs.dateCharted) AS year, COUNT(DISTINCT a.aID) as num_of_unique_t50
              FROM Artist a
              JOIN ArtistSongs aso ON a.aID = aso.aID
              JOIN ChartedSong cs ON cs.sID = aso.sID
              JOIN ArtistGenres ag ON ag.aID = a.aID
              JOIN Genre g ON ag.name = g.name AND g.name='rap'
              GROUP BY EXTRACT(YEAR FROM cs.dateCharted)
            ) t2 ON t1.year = t2.year
            JOIN (
              SELECT AVG(s.tempo) AS avg_tempo, s.year
              FROM Song s
              JOIN ArtistSongs aso ON s.sID = aso.sID
              JOIN ArtistGenres ag ON ag.aID = aso.aID AND ag.name = 'rap'
              GROUP BY s.year 
            ) t3 ON t3.year = t1.year

            ORDER BY t1.year ASC
*/