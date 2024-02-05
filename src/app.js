const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userProtectedRoutes = require('./routes/userProtectedRoutes');
const userNonProctectedRoutes = require('./routes/userNonProtectedRoutes');
const { authenticateUser } = require('./middleware/authMiddleware');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI);

app.use('/api', userNonProctectedRoutes);

app.use('/api/protected', authenticateUser, userProtectedRoutes);

app.listen(process.env.PORT, () => {
    console.log(`App is now running on port ${process.env.PORT}`);
});
