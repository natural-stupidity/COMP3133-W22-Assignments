const mongoose = require('mongoose')

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const UserSchema = mongoose.Schema(
    {
        username: { type: String, unique: true, required: true },
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        password: {
            type: String,
            required: true,
            minlength: 6,
            validate: {
                validator: (value) => /^[a-zA-Z0-9#$&_]*$/.test(value),
                message: "Email Address is invalid",
            },
        },
        email: {
            type: String,
            unique: true,
            required: true,
            validate: {
                validator: (value) => emailRegex.test(value),
                message: "Email Address is invalid",
            },
        },
        type: {
            type: String,
            default: 'customer',
            enum: ['customer', 'admin'],
            required: true
        }
    }
)

module.exports = mongoose.model('User', UserSchema, "UserInfo")