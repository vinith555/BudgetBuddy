// server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;
require('dotenv').config();
const SECRET_KEY = process.env.JWT_SECRET;


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

// Middleware
app.use(cors());
app.use(express.json());

// JWT Middleware
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  // console.log("Auth Header:", authHeader);
  if (!authHeader) return res.status(403).send("Token missing");

  const token = authHeader.split(' ')[1];
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
       console.log("JWT ERROR:", err.message);
      return res.status(403).send("Invalid token")};
    req.user = user;
    next();
  });
}

// User Signup
app.post('/api/register', async (req, res) => {
  const { user_name, email, pass_word } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(pass_word, 10);
    const sql = `INSERT INTO users (user_name, email, password) VALUES (?, ?, ?)`;
    con.query(sql, [user_name, email, hashedPassword], (err, result) => {
      if (err) {
        return res.status(500).send("Error creating user");
      }
      res.status(201).send("User created successfully");
    });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).send("Server error");
  }
});


// User Login
app.post('/api/login', (req, res) => {
  const { email, pass_word } = req.body;
  const sql = `SELECT * FROM users WHERE email = ?`;
  con.query(sql, [email], async (err, results) => {
    if (err || results.length === 0) return res.status(401).send("Invalid credentials");
    const user = results[0];
    const isMatch = await bcrypt.compare(pass_word, user.password);
    if (!isMatch) return res.status(401).send("Invalid credentials");

    const token = jwt.sign({ user_id: user.user_id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token, user_id: user.user_id });
  });
});

// Add Transaction
app.post('/api/user/add_data/:id', verifyToken, (req, res) => {
  const userId = req.params.id;
  const { type, category, amount, payment_method, created_at } = req.body;
  const sql = `INSERT INTO transactions (user_id, type, category, amount, payment_method, created_at) VALUES (?, ?, ?, ?, ?, ?)`;
  con.query(sql, [userId, type, category, amount, payment_method, created_at], (err, result) => {
    if (err) return res.status(500).send("Database error");
    res.status(200).send("Data added successfully");
  });
});

// Get All Transactions by Type
app.get('/api/user/:type/:id', verifyToken, (req, res) => {
  const { type, id: userId } = req.params;
  const sql = `SELECT id, category, amount, payment_method, DATE_FORMAT(created_at, '%Y-%m-%d') AS created_date FROM transactions WHERE user_id = ? AND type = ?`;
  con.query(sql, [userId, type], (err, result) => {
    if (err) return res.status(500).send("Internal server error");
    res.send(result);
  });
});

// Get Yearly Total by Type
app.get('/api/user/total/:type/:year/:id', verifyToken, (req, res) => {
  const { type, year, id: userId } = req.params;
  const sql = `SELECT SUM(amount) as Total FROM transactions WHERE user_id = ? AND type = ? AND YEAR(created_at) = ?`;
  con.query(sql, [userId, type, year], (err, result) => {
    if (err) return res.status(500).send("Internal server error");
    res.send({ total: result[0].Total });
  });
});

// Get Category-wise Expense for Year
app.get('/api/user/category/:year/:id', verifyToken, (req, res) => {
  const { year, id: userId } = req.params;
  const sql = `SELECT category, SUM(amount) AS Amount FROM transactions WHERE YEAR(created_at) = ? AND user_id = ? AND type = 'expense' GROUP BY category`;
  con.query(sql, [year, userId], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(results);
  });
});

// Get Monthly Summary
app.get('/api/user/:type/:year/:id/monthly', verifyToken, (req, res) => {
  const { type, year, id: userId } = req.params;
  const sql = `SELECT MONTH(created_at) AS month, SUM(amount) AS total FROM transactions WHERE type = ? AND YEAR(created_at) = ? AND user_id = ? GROUP BY MONTH(created_at) ORDER BY MONTH(created_at)`;
  con.query(sql, [type, year, userId], (err, results) => {
    if (err) return res.status(500).send("Database error");
    const monthlyData = Array(12).fill(0);
    results.forEach(row => {
      monthlyData[row.month - 1] = parseFloat(row.total);
    });
    res.send(monthlyData);
  });
});

// Get Transaction Summary
app.get('/api/user/summery/:id', verifyToken, (req, res) => {
  const userId = req.params.id;
  const sql = `SELECT category, amount, payment_method, DATE_FORMAT(created_at, '%Y-%m-%d') AS created_date FROM transactions WHERE user_id = ?`;
  con.query(sql, [userId], (err, result) => {
    if (err) return res.status(500).send("Database error");
    res.send(result);
  });
});

// Get Highest Transaction
app.get('/api/user/highestTransaction/:id', verifyToken, (req, res) => {
  const userId = req.params.id;
  const sql = `SELECT MAX(amount) as maxAmount FROM transactions WHERE user_id = ?`;
  con.query(sql, [userId], (err, result) => {
    if (err) return res.status(500).send("Database error");
    res.send({ maxAmount: result[0].maxAmount });
  });
});

// Delete Transaction
app.delete('/api/user/delete/:uniqueId', verifyToken, (req, res) => {
  const uniqueId = req.params.uniqueId;
  const sql = `DELETE FROM transactions WHERE id = ?`;
  con.query(sql, [uniqueId], (err, result) => {
    if (err) return res.status(500).send({ error: 'Failed to delete transaction' });
    if (result.affectedRows === 0) return res.status(404).send({ message: 'Transaction not found' });
    res.status(200).send({ message: 'Transaction deleted successfully' });
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
