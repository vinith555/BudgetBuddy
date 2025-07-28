const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/auth');
const transactionController = require('../controllers/transactionController');

router.post('/add_data/:id', verifyToken, transactionController.addTransaction);
router.get('/summery/:id', verifyToken, transactionController.getSummary);
router.get('/highestTransaction/:id', verifyToken,transactionController.highestTransaction);
router.get('/:type/:id', verifyToken,transactionController.allTransactionByType);
router.get('/total/:type/:year/:id', verifyToken,transactionController.yearlyTotal);
router.get('/monthly/:type/:year/:id', verifyToken,transactionController.monthlySummary);
router.get('/delete/:uniqueId', verifyToken,transactionController.deleteTransaction);

module.exports = router;
