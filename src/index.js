const express = require('express');
const cors = require('cors');
require('dotenv').config();

const gadgetRoutes = require('./routes/gadgetRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/gadgets', gadgetRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to IMF Gadget API' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
