const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});
const User = mongoose.model('User', userSchema);

const Emotion = require('./server/models/Emotion');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('MoodiTree server is running');
});

app.post('/api/join', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {
    const exist = await User.findOne({ email });
    if (exist) return res.status(409).json({ message: 'Email already exists' });
    await User.create({ name, email, password });
    res.status(201).json({ message: 'Signup successful' });
  } catch (e) {
    res.status(500).json({ message: 'Server error', error: e.message });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });
    res.json({ message: 'Login successful', name: user.name, email: user.email });
  } catch (e) {
    res.status(500).json({ message: 'Server error', error: e.message });
  }
});

app.post('/api/emotion', async (req, res) => {
  const { email, emotion, label, date, recommendations } = req.body;
  if (!email || !emotion || !label || !date || !recommendations) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  try {
    const doc = await Emotion.create({ email, emotion, label, date, recommendations });
    res.status(201).json({ message: 'Emotion saved', doc });
  } catch (e) {
    res.status(500).json({ message: 'Server error', error: e.message });
  }
});

app.get('/api/emotion', async (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ message: 'Email is required' });
  try {
    const list = await Emotion.find({ email }).sort({ date: -1 });
    res.json({ message: 'Emotions retrieved', emotions: list });
  } catch (e) {
    res.status(500).json({ message: 'Server error', error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
