require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const { initDb } = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: ['http://localhost:5173',"https://movieflex-project.vercel.app/"], credentials: true }));
app.use(express.json());

app.use('/api', authRoutes);

(async () => {
  try {
    await initDb();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to initialize database:', err.message || err);
    process.exit(1);
  }
})();
