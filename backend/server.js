const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '5114',
  database: 'budjectbuddy'
});

con.connect((err)=>{
    if(err) throw err;
    console.log("connected");
})

app.use(cors());
app.use(express.json());

app.get('/user/summery/:id',(req,res) => {
    const userId = req.params.id;
    const sql = `SELECT ts.category, ts.amount, ts.payment_method, ts.created_at
    FROM transactions AS ts
    INNER JOIN users ON users.user_id = ts.user_id
    WHERE users.user_id = ?`;

    con.query(sql,[userId],(err,result)=>{
      res.send(result);
    });

});

app.get('/user/:type/:id', (req, res) => {
  const userId = req.params.id;
  const type = req.params.type;

  const sql = `
    SELECT ts.category, ts.amount, ts.payment_method, DATE_FORMAT(ts.created_at, '%Y-%m-%d') AS created_date
    FROM transactions AS ts
    INNER JOIN users ON users.user_id = ts.user_id
    WHERE users.user_id = ? AND ts.type = ?`;

  con.query(sql, [userId,type], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send('Internal Server Error');
    }
    res.send(result);
  });
});

app.get('/user/total/:type/:year/:id',(req,res) => {
    const userId = req.params.id;
    const type = req.params.type;
    const year = req.params.year;
    const sql = `SELECT SUM(transactions.amount) as Total FROM transactions INNER JOIN users 
    ON transactions.user_id = users.user_id WHERE users.user_id = ? AND transactions.type = ? AND YEAR(transactions.created_at) = ?`;

    con.query(sql,[userId, type, year],(err,result) =>{
        if(err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        res.send(result[0].Total);
    } );
});

app.post('/user/add_data/:id', (req, res) => {
  const userId = req.params.id;
  const { type, category, amount, payment_method, created_at } = req.body;

  const sql = `
    INSERT INTO transactions (user_id, type, category, amount, payment_method, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  con.query(
    sql,
    [userId, type, category, amount, payment_method, created_at],
    (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).send("Database error");
      }
      res.status(200).send("Data Added Successfully"); 
    }
  );
});

app.get('/user/:type/:year/:id', (req, res) => {
  const userId = req.params.id;
  const year = req.params.year;
  const type = req.params.type;

  const sql = `
    SELECT MONTH(created_at) AS month, SUM(amount) AS total_income FROM transactions WHERE type = ?
    AND YEAR(created_at) = ? AND user_id = ? GROUP BY MONTH(created_at) ORDER BY MONTH(created_at)`;

  con.query(sql, [type, year, userId], (err, results) => {
    if (err) {
      return res.status(500).send("Database Error");
    }

    const amount = Array(12).fill(0);

    results.forEach(row => {
      const monthIndex = row.month - 1; 
      amount[monthIndex] = parseFloat(row.total_income);
    });
    res.send(amount); 
  });
});



app.listen(5000,()=>{ console.log("Listening in port number 5000");
 });