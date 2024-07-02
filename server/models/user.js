const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { isValidPhoneNumber } = require('libphonenumber-js')
var AutoIncrement = require('mongoose-sequence')(mongoose);
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const customer_Schema = mongoose.Schema({
    _id: {
        type: Schema.Types.ObjectId,
    },
    email: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: false,
    },
   
})
customer_Schema.plugin(mongoosePaginate);



customer_Schema.methods.generateAuthToken = async function () {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({ _id: user._id}, process.env.JWT_KEY_CUSTOMER)
    await user.save()
    return token
}

customer_Schema.statics.findByCredentials = async (email, password) => {
    const user = await Customer.findOne({ email })
    console.log("user", user)
    if (!user) {
        return null;
    }
    if (!user.password) {
        return "wrong password"
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        return "wrong password"
    }
    return user
}

const Customer = mongoose.models.Customer || mongoose.model('Customer', customer_Schema);

module.exports = Customer