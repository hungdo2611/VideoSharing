const mongoose = require('mongoose')

const db_url = "mongodb://127.0.0.1:27017/sharingvid";
mongoose.connect(db_url, { useNewUrlParser: true }, function (err) {
    if (err) throw err; console.log('Successfully connected');
});