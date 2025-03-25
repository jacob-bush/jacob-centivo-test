const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

// MongoDB connection string (replace with your own connection string)
const mongoURI = 'mongodb://localhost:27017/users_db';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Create the User schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number
});

// Create the User model
const User = mongoose.model('User', userSchema);

// Middleware to parse JSON requests
app.use(express.json());

// GET endpoint to retrieve user by ID
app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    // Query the database for a user by ID
    const user = await User.findById(id);
    
    // If user not found, return a 404
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Only return the user if their age is greater than 21
    if (user.age > 21) {
      return res.json(user);
    } else {
      return res.status(404).json({ message: 'User not found or age is less than 21' });
    }

  } catch (err) {
    // Gracefully handle invalid ObjectId errors
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
