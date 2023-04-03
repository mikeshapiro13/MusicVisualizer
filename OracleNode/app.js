let connection;
var oracledb = require("oracledb");

(async function () {
  try {
    connection = await oracledb.getConnection({
      user: "kyle.hoang",
      password: "9rfIUbwkC1ypweydgbnA3Ln8",
      connectString: "oracle.cise.ufl.edu:1521/orcl",
    });
    console.log("Successfully connected to Oracle!");
    const result = await connection.execute(
      `SELECT * from Songs where Artists = '[''Ariana Grande'']'`
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
})();
