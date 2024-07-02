require('./db/db');
const express = require('express');
const path = require('path');
const customer_router = require('./routers/user');
const video_router = require('./routers/video');

require('dotenv').config({ path: path.join(__dirname, '.env') });

const cors = require('cors');

const app = express()
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true,

}));
app.use(express.json())

app.use('/api', customer_router);
app.use('/api', video_router);

app.get("/", (req, res) => {
    res.send("Hello World");
});
app.listen(6969, () => {
    console.log(`Server running on port 6969`)
})

