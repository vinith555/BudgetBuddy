const db = require("../config/db");

function createUser(user_name, email, hashedPassword, callback) {
  const sql = `INSERT INTO users (user_name, email, password) VALUES (?, ?, ?)`;
  db.query(sql, [user_name, email, hashedPassword], callback);
}

function getUserByEmail(email, callback) {
  const sql = `SELECT * FROM users WHERE email = ?`;
  db.query(sql, [email], callback);
}

module.exports = { createUser, getUserByEmail };
