const express = require('express');
const cors = require('cors');
const authRoutes = require('./route/authRoute');
const postRoutes = require('./route/postRoute');
require('dotenv').config();

const app = express();

// Enable CORS
app.use(cors());

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
