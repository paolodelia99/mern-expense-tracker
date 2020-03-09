const express = require('express');
const router = express.Router();
const {
    getUser,
    authUser
} = require('../controllers/auth');

//Auth user
router
    .route('/')
    .get(getUser)
    .post(authUser);

module.exports = router;