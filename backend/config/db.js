const mysql = require('mysql2');

// MySQL Connection
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '5114',
  database: 'budjectbuddy'
});

con.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database.");
});

module.exports = con;