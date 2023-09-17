const mongoose = require('mongoose')

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const SavingsListingSchema = mongoose.Schema(
    {
        listing_id: { type: String, required: true },
        listing_title: { type: String, required: true },
        description: { type: String, required: true },
        street: { type: String, required: true },
        city: { type: String, required: true },
        postal_code: { type: String, required: true },
        price: { type: Number, required: true },
        email: {
            type: String,
            required: true,
            validate: {
                validator: (value) => emailRegex.test(value),
                message: "Email Address is invalid",
            },
        },
        username: { type: String, required: true }
    }
)

module.exports = mongoose.model("SavingsListing", SavingsListingSchema, "SL")