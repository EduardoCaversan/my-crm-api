const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/users/loginUser', userController.loginUser);
router.get('/users/listAllUsers', userController.getAllUsers);
router.post('/users/createUser', userController.createUser);
router.delete('/users/:userId', userController.deleteUser);

module.exports = router;