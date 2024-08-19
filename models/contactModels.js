const fs = require('fs');
const path = require('path');

const dbFilePath = path.join(__dirname, '../db.json');

// Function to get all contacts
const getContacts = () => {
    const data = fs.readFileSync(dbFilePath);
    const jsonData = JSON.parse(data);
    return jsonData.contacts || [];
};

// Function to save contacts
const saveContacts = (contacts) => {
    const data = { contacts };
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
};

module.exports = {
    getContacts,
    saveContacts
};
