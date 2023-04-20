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
    app.post("/login", async (req, res) => {
      try {
        const username = req.body.username;
        const password = req.body.password;

        const test = await connection.execute(
          'INSERT INTO Users VALUES (:username, :password)',
          [username, password]
        );

        console.log(`username: ${username}, password: ${password}`);
    
        // execute the SQL query with the user input
        const result = await connection.execute(
          'SELECT * FROM Users WHERE username = :username AND password = :password',
          [username, password]
        );
        console.log(result);
    
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
    app.get("/query:id/:start?/:end?/:country?/:name?", (req, res) => {
      const queryId = req.params.id;
      let query;
      const startYear = req.params.start || 2014;
      const endYear =  req.params.end || 2020;
      switch (queryId) {
        
        case "1":

          query = `WITH Weeks AS (
            SELECT 
              EXTRACT(YEAR FROM dateCharted) AS chart_year,
              TO_NUMBER(TO_CHAR(dateCharted, 'IW')) AS chart_week,
              COUNT(*) AS num_songs,
              SUM(streams) AS total_streams
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
            total_streams / num_songs AS average_streams_per_week
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
          query = `SELECT 
                    EXTRACT(year FROM datecharted) AS year,
                    COUNT(distinct name)
                  FROM chartedsong NATURAL JOIN artistsongs NATURAL JOIN artistgenres
                  GROUP BY EXTRACT(year FROM datecharted)
                  ORDER BY year ASC`;
          executeQuery(query, {}, (err, rows) => {
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
          const selectedName = req.query.name;
          query = `
              SELECT 
                  a.name AS artist,
                  s.year AS release_year,
                  MIN(s.tempo) AS min_tempo,
                  MAX(s.tempo) AS max_tempo,
                  AVG(s.tempo) AS avg_tempo
              FROM 
                  Artist a
                  JOIN ArtistSongs asg ON a.aID = asg.aID
                  JOIN Song s ON asg.sID = s.sID
              WHERE
                  a.name = :selectedName
              GROUP BY 
                  a.name, s.year
              ORDER BY 
                  s.year ASC
          `;
          executeQuery(query, { selectedName }, (err, rows) => {
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
