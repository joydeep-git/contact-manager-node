const asyncHandler = require("express-async-handler");
const Contact = require("../model/contactModel")

const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
});

const getContact = asyncHandler(async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            res.status(404).json({ message: "Contact not found" });
        } else {
            res.status(200).json(contact);
        }
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

const createContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory!")
    } else {
        const newContact = await Contact.create({
            name, email, phone
        })
        res.status(201).json(newContact);
    }
});

const updateContact = asyncHandler(async (req, res) => {

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true });

    res.status(200).json(updatedContact);
});

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    res.status(200).json({ message: `Contact deleted with ID: ${req.params.id}` });
});

module.exports = { getContacts, getContact, createContact, updateContact, deleteContact }