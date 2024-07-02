const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');


const videoshare_Schema = mongoose.Schema({
    time: {
        type: Number,
        required: true,
    },
    title:{
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: false,
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
    }

})


videoshare_Schema.plugin(mongoosePaginate);

const Video_Share = mongoose.model('video', videoshare_Schema)

module.exports = Video_Share