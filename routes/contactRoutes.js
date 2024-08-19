const express = require('express');
const contactController = require('../controllers/contactControllers.js');

const router = express.Router();

router.get('/', contactController.getAllContacts);
router.post('/', contactController.createContact);

// PUT to update a contact by ID
router.put('/:id', contactController.updateContact);

// DELETE a contact by ID
router.delete('/:id', contactController.deleteContact);

module.exports = router;
