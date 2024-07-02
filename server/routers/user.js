const express = require('express')
const Customer = require('../models/user')
const customer_router = express.Router()
const parsePhoneNumber = require('libphonenumber-js')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

const formatUser = (user) => {
    return {
        "email": user.email
    }
}

customer_router.post('/users/login', async (req, res) => {
    //Login a registered user
    try {
        const { email, password } = req.body

        const user = await Customer.findByCredentials(email, password)
        if (user == "wrong password") {
            return res.status(200).send({ err: true, data: "Wrong pass" })
        }
        if (!user) {
            return res.status(200).send({ err: true, data: "user not found" })
        }
        const token = await user.generateAuthToken()
        const responeDt = formatUser(user);
        res.status(200).send({ data: { ...responeDt, token }, token, err: false })
    } catch (error) {
        res.status(400).send({ err: true, error })
            ;
        console.log('err login', error)
    }
})
//logout api
customer_router.post('/users/register', async (req, res) => {
    // Create a new user
    try {


        const { email, password } = req.body;
        const enc_pass = await bcrypt.hash(password, 8);
        const bodyrequest = {
            "_id": new mongoose.Types.ObjectId(),
            email,
            password: enc_pass

        }
        const user = new Customer(bodyrequest)
        await user.save()
        const token = await user.generateAuthToken()
        const responeDt = formatUser(user);

        res.status(200).send({ data: { ...responeDt, token }, token, err: false })
    } catch (error) {
        console.log("error", error)
        res.status(400).send({ err: true, error })

    }
})




module.exports = customer_router;