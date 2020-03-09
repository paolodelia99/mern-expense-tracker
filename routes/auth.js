const express = require('express');
const router = express.Router();
const {
    authUser
} = require('../controllers/auth');

//Auth user
router
    .route('/')
    .post(authUser);

module.exports = router;