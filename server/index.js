require('./db/db');
const express = require('express');
const path = require('path');
const customer_router = require('./routers/user');
const video_router = require('./routers/video');
const http = require("http");
const socket = require('./socket');

require('dotenv').config({ path: path.join(__dirname, '.env') });

const cors = require('cors');
const app = express()
const server = http.createServer(app);
socket.connect(server);




app.use(cors());
app.use(express.json())

app.use('/api', customer_router);
app.use('/api', video_router);

app.get("/", (req, res) => {
    res.send("Hello World");
});
const port = process.env.PORT
server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

