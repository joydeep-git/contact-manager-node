const getContacts = async (req, res) => {
    res.status(201).json({ message: "Getting all contacts" });
}

const getContact = async (req, res) => {
    res.status(201).json({ message: `Getting contact with id:${req.params.id}` });
}

const createContact = async (req, res) => {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory!")
    } else {
        res.status(201).json({ message: "Creating new contact" });
    }
}

const updateContact = async (req, res) => {
    res.status(201).json({ message: `updating contact with id:${req.params.id}` });
}

const deleteContact = async (req, res) => {
    res.status(201).json({ message: `Deleting contact with id:${req.params.id}` });
}

module.exports = { getContacts, getContact, createContact, updateContact, deleteContact }