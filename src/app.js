const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const { authenticateUser } = require('./middleware/authMiddleware');

const app = express();
const port = 3000;

app.use(bodyParser.json());

mongoose.connect('connection string here!');

app.use('/api', userRoutes);

app.use('/api/protected', authenticateUser, userRoutes);

app.listen(port, () => {
    console.log(`App is now running on port ${port}`);
});
