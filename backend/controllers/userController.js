const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;
const User = require('../models/userModel');

exports.register = async (req, res) => {
  const { user_name, email, pass_word } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(pass_word, 10);
    User.createUser(user_name, email, hashedPassword, (err, result) => {
      if (err) return res.status(500).send("Error creating user");
      res.status(201).send("User created successfully");
    });
  } catch (err) {
    res.status(500).send("Server error");
  }
};

exports.login = (req, res) => {
  const { email, pass_word } = req.body;
  User.getUserByEmail(email, async (err, results) => {
    if (err || results.length === 0) return res.status(401).send("Invalid credentials");
    const user = results[0];
    const isMatch = await bcrypt.compare(pass_word, user.password);
    if (!isMatch) return res.status(401).send("Invalid credentials");

    const token = jwt.sign({ user_id: user.user_id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token, user_id: user.user_id });
  });
};
