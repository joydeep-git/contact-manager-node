const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please add name"]
        },
        email: {
            type: String,
            required: [true, "Please add Email ID"]
        },
        phone: {
            type: String,
            required: [true, "Please add Phone number"]
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Contacts", contactSchema);