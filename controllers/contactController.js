const getContacts = (req, res) => {
    res.status(201).json({ message: "Getting all contacts" });
}

const getContact = (req, res) => {
    res.status(201).json({ message: `Getting contact with id:${req.params.id}` });
}

const createContact = (req, res) => {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        
    }
    res.status(201).json({ message: "Creating new contact" });
}

const updateContact = (req, res) => {
    res.status(201).json({ message: `updating contact with id:${req.params.id}` });
}

const deleteContact = (req, res) => {
    res.status(201).json({ message: `Deleting contact with id:${req.params.id}` });
}

module.exports = { getContacts, getContact, createContact, updateContact, deleteContact }