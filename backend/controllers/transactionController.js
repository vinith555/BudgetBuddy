const Transaction = require('../models/transactionModel');

exports.addTransaction = (req, res) => {
  const userId = req.params.id;
  Transaction.addTransaction(userId, req.body, (err, result) => {
    if (err) {
      console.error('Add Transaction Error:', err);
      return res.status(500).send("Database error");
    }
    res.status(200).send("Data added successfully");
  });
};

exports.getSummary = (req, res) => {
  const userId = req.params.id;
  Transaction.getSummary(userId, (err, result) => {
    if (err) {
      console.error('Summary Error:', err);
      return res.status(500).send("Database error");
    }
    res.send(result);
  });
};

exports.highestTransaction = (req, res) => {
  const userId = req.params.id;
  Transaction.highestTransaction(userId, (err, result) => {
    if (err) {
      console.error('Highest Transaction Error:', err);
      return res.status(500).send("Database error");
    }
    const maxAmount = result[0].maxAmount;
    res.send( maxAmount );
  });
};

exports.allTransactionByType = (req, res) => {
  const { type, id: userId } = req.params;
  Transaction.getAllTransactionByType(userId, type, (err, result) => {
    if (err) {
      console.error('Get By Type Error:', err);
      return res.status(500).send("Internal server error");
    }
    res.send(result);
  });
};

exports.yearlyTotal = (req, res) => {
  const { type, year, id: userId } = req.params;
  Transaction.getYearlyTotal(userId, type, year, (err, result) => {
    if (err) {
      console.error('Yearly Total Error:', err);
      return res.status(500).send("Internal server error");
    }
    const total = +result[0].Total || 0;
    res.send(total);
  });
};

exports.monthlySummary = (req, res) => {
  const { type, year, id: userId } = req.params;
  Transaction.monthlySummary(userId, type, year, (err, results) => {
    if (err) {
      console.error('Monthly Summary Error:', err);
      return res.status(500).send("Database error");
    }
    const monthlyData = Array(12).fill(0);
    results.forEach(row => {
      monthlyData[row.month - 1] = parseFloat(row.total);
    });
    res.send(monthlyData);
  });
};

exports.deleteTransaction = (req, res) => {
  const uniqueId = req.params.uniqueId;
  Transaction.deleteTransaction(uniqueId, (err, result) => {
    if (err) {
      console.error('Delete Transaction Error:', err);
      return res.status(500).send({ error: 'Failed to delete transaction' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: 'Transaction not found' });
    }
    res.status(200).send({ message: 'Transaction deleted successfully' });
  });
};
