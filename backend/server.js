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

app.get('/user/income/:id', (req, res) => {
  const userId = req.params.id;

  const sql = `
    SELECT ts.category, ts.amount, ts.payment_method, ts.created_at
    FROM transactions AS ts
    INNER JOIN users ON users.user_id = ts.user_id
    WHERE users.user_id = ? AND ts.type = ?
  `;

  con.query(sql, [userId,"income"], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send('Internal Server Error');
    }
    res.send(result);
  });
});

app.get('/user/expense/:id', (req, res) => {
  const userId = req.params.id;

  const sql = `
    SELECT ts.category, ts.amount, ts.payment_method, ts.created_at
    FROM transactions AS ts
    INNER JOIN users ON users.user_id = ts.user_id
    WHERE users.user_id = ? AND ts.type = ?
  `;

  con.query(sql, [userId,"expense"], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send('Internal Server Error');
    }
    res.send(result);
  });
});

app.get('/user/total_income/:id',(req,res) => {
    const userId = req.params.id;
    const sql = `SELECT SUM(transactions.amount) FROM transactions INNER JOIN users 
    ON transactions.user_id = users.user_id WHERE users.user_id = ? AND transactions.type = ?`;

    con.query(sql,[userId, 'income'],(err,result) =>{
        if(err) {
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
        res.send(result);
    } );
});

app.listen(5000,()=>{ console.log("Listening in port number 5000");
 });