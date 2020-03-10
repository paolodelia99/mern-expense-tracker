const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check } = require('express-validator');
const {
    authUser,
    getUser
} = require('../controllers/auth');

//Auth user
router
    .post('/',[
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists()
    ],authUser);

router.get('/',auth, getUser);

module.exports = router;