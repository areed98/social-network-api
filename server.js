//Import express and mongoose
const express = require('express');
const mongoose = require('mongoose');

// Initialize express and declare port
const app = express();
const PORT = process.env.PORT || 3001;

// Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(require('./routes'));

// Connection to mongodb
mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/social-network-api',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

//Debug
mongoose.set('debug', true);

//Starts server
app.listen(PORT, () => console.log(`Server connected at http://localhost:${PORT}`));