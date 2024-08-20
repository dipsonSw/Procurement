const express = require('express');
const {
    registerUser,
    loginUser,
    getUser,
    updateUser,
    deleteUser
} = require('../controllers/userController');

const router = express.Router();

// Route to register a new user
router.post('/register', registerUser);

// Route to login a user
router.post('/login', loginUser);

// Route to get user details
router.get('/user/:id', getUser);

// Route to update user details
router.put('/user/:id', updateUser);

// Route to delete a user
router.delete('/user/:id', deleteUser);

module.exports = router;
