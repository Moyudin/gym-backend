const contactModel = require('../models/contactModels.js');

// Get all contacts
const getAllContacts = (req, res) => {
    const contacts = contactModel.getContacts();
    res.json(contacts);
};

// Add a new contact
const createContact = (req, res) => {
    const { name, email, message, workoutType } = req.body;

    if (!name || !email || !message || !workoutType) {
        return res.status(400).json({ error: 'Please provide all required fields' });
    }

    const contacts = contactModel.getContacts();
    const newContact = {
        id: contacts.length + 1,
        name,
        email,
        message,
        workoutType
    };

    contacts.push(newContact);
    contactModel.saveContacts(contacts);

    res.status(201).json(newContact);
};

// Update a contact by ID
const updateContact = (req, res) => {
    const { id } = req.params;
    const { name, email, message, workoutType } = req.body;

    let contacts = contactModel.getContacts();
    const contactIndex = contacts.findIndex(contact => contact.id === parseInt(id));

    if (contactIndex === -1) {
        return res.status(404).json({ error: 'Contact not found' });
    }

    const updatedContact = { id: parseInt(id), name, email, message, workoutType };
    contacts[contactIndex] = updatedContact;
    contactModel.saveContacts(contacts);

    res.json(updatedContact);
};

// Delete a contact by ID
const deleteContact = (req, res) => {
    const { id } = req.params;
    let contacts = contactModel.getContacts();

    const contactIndex = contacts.findIndex(contact => contact.id === parseInt(id));

    if (contactIndex === -1) {
        return res.status(404).json({ error: 'Contact not found' });
    }

    contacts = contacts.filter(contact => contact.id !== parseInt(id));
    contactModel.saveContacts(contacts);

    res.status(204).send(); // 204 No Content
};

module.exports = {
    getAllContacts,
    createContact,
    updateContact,
    deleteContact
};