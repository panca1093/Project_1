const mysql = require("mysql");

const connection = mysql.createConnection({
  user: "devuser",
  password: "barCODE10",
  host: "localhost",
  database: "mydb",
  port: 3306
});

// connection.connect((err, result) => {
//   if (err) throw console.log("not connect");

//   console.log("connect !");
// });

module.exports = connection;
