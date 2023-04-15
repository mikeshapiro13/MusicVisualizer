const express = require("express");
const oracledb = require("oracledb");

const app = express();
const port = 3000;

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

    // set up routes
    app.get("/query:id", (req, res) => {
      const queryId = req.params.id;
      let query;
      switch (queryId) {
        case "1":
          const startYear = 2014;
          const endYear = 2015;
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
          query = `select extract(year from datecharted) as year, count(distinct name)
          from chartedsong natural join artistsongs natural join artistgenres
          group by extract(year from datecharted)
          order by year asc`;
          executeQuery(query, {}, (err, rows) => {
            if (err) {
              res.status(err).send(rows);
            } else {
              res.send(rows);
            }
          });
          break;
        case "3":
          query = "SELECT * FROM ChartedSong FETCH FIRST 1 ROWS ONLY";
          break;
        case "4":
          query = "SELECT * FROM Genre FETCH FIRST 1 ROWS ONLY";
          break;
        case "5":
          query = "SELECT * FROM ArtistGenres FETCH FIRST 1 ROWS ONLY";
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
