const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');
const { validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const {
    getProfile,
    createProfile,
    addTransaction,
    deleteTransaction
} = require('../controllers/profile');

router
    .get('/', auth, getProfile);

router
    .post('/',[auth], createProfile);

router
    .post('/transaction', auth, addTransaction);

router
    .delete('/transaction/:id', auth, deleteTransaction);

module.exports = router;