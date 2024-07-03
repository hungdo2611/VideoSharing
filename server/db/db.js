const mongoose = require('mongoose')

const db_url = "mongodb://mongo:27017/sharingvid";
mongoose.connect(db_url, { useNewUrlParser: true }, function (err) {
    if (err) throw err; console.log('Successfully connected');
});