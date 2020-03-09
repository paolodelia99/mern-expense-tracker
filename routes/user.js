const express = require('express');
const router = express.Router();
const {
    registerUser
} = require('../controllers/users');

//Register user route
router
    .route('/')
    .post(registerUser);

module.exports = router;