const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/user', require('./routes/transactionRoutes'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
