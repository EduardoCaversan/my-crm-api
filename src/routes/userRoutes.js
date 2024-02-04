const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/users/listAllUsers', userController.getAllUsers);
router.post('/users/createUser', userController.createUser);
router.post('/users/loginUser', userController.loginUser);
router.delete('/users/:userId', userController.deleteUser);
router.get('/users/:userId/consumers', userController.listConsumers);
router.post('/users/:userId/consumers', userController.addConsumer);
router.put('/users/:userId/consumers/:consumerId', userController.editConsumer);
router.delete('/users/:userId/consumers/:consumerId', userController.removeConsumer);

module.exports = router;
