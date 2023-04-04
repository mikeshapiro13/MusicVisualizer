let connection;
var oracledb = require("oracledb");
var express = require("express");
const { get } = require("http");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

async function oracleConnect() {
  try {
    connection = await oracledb.getConnection({
      user: "kyle.hoang",
      password: "9rfIUbwkC1ypweydgbnA3Ln8",
      connectString: "oracle.cise.ufl.edu:1521/orcl",
    });
    console.log("Successfully connected to Oracle!");
    const result = await connection.execute(
      `SELECT * from chartedSong where countryCharted = 'us'`
    );
    console.log(result);
  } catch (err) {
    console.log("Error: ", err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.log("Error when closing the database connection: ", err);
      }
    }
  }
}

oracleConnect();

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
