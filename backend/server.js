const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());

app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port at http://localhost:${PORT}`);
});