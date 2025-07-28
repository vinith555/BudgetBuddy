const db = require("../config/db");

function addTransaction(userId, data, cb) {
    const { type, category, amount, payment_method, created_at } = data;
    const sql = `
        INSERT INTO transactions 
        (user_id, type, category, amount, payment_method, created_at) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(sql, [userId, type, category, amount, payment_method, created_at], cb);
}

function getSummary(userId, cb) {
    const sql = `
        SELECT category, amount, payment_method, 
        DATE_FORMAT(created_at, '%Y-%m-%d') AS created_date 
        FROM transactions 
        WHERE user_id = ?
    `;
    db.query(sql, [userId], cb);
}

function highestTransaction(userId, cb) {
    const sql = `
        SELECT MAX(amount) as maxAmount 
        FROM transactions 
        WHERE user_id = ? AND type = 'expense'
    `;
    db.query(sql, [userId], cb);
}

function getAllTransactionByType(userId, type, cb) {
    const sql = `
        SELECT id, category, amount, payment_method, 
        DATE_FORMAT(created_at, '%Y-%m-%d') AS created_date 
        FROM transactions 
        WHERE user_id = ? AND type = ?
    `;
    db.query(sql, [userId, type], cb);
}

function getYearlyTotal(userId, type, year, cb) {
    const sql = `
        SELECT SUM(amount) as Total 
        FROM transactions 
        WHERE user_id = ? AND type = ? AND YEAR(created_at) = ?
    `;
    db.query(sql, [userId, type, year], cb);
}

function monthlySummary(userId, type, year, cb) {
    const sql = `
        SELECT MONTH(created_at) AS month, SUM(amount) AS total 
        FROM transactions 
        WHERE type = ? AND YEAR(created_at) = ? AND user_id = ? 
        GROUP BY MONTH(created_at) 
        ORDER BY MONTH(created_at)
    `;
    db.query(sql, [type, year, userId], cb);
}

function deleteTransaction(uniqueId, cb) {
    const sql = `DELETE FROM transactions WHERE id = ?`;
    db.query(sql, [uniqueId], cb);
}

module.exports = {
    addTransaction,
    getSummary,
    highestTransaction,
    getAllTransactionByType,
    getYearlyTotal,
    monthlySummary,
    deleteTransaction
};
