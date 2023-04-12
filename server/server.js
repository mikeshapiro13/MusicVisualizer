const express = require('express');
const oracledb = require('oracledb');

const app = express();
const port = 3000; // or any port of your choice

// connect to Oracle database
oracledb.getConnection({
    user: "kyle.hoang",
    password: "9rfIUbwkC1ypweydgbnA3Ln8",
    connectString: "oracle.cise.ufl.edu:1521/orcl"
}, (err, connection) => {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log('Connected to Oracle database');

  // set up routes
  app.get('/query:id', (req, res) => {
    const queryId = req.params.id;
    let query;
    switch (queryId) {
      case '1':
        query = 'SELECT COUNT(*) FROM Artist';
        break;
      case '2':
        query = 'SELECT COUNT(*) FROM Song';
        break;
      case '3':
        query = 'SELECT COUNT(*) FROM ChartedSong';
        break;
      case '4':
        query = 'SELECT COUNT(*) FROM Genre';
        break;
      case '5':
        query = 'SELECT COUNT(*) FROM ArtistGenres';
        break;
      default:
        res.status(404).send('Invalid query ID');
        return;
    }
    connection.execute(query, (err, result) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Internal server error');
        return;
      }
      res.send(result.rows);
    });
  });

  // start the server
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});
