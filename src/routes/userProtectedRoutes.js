const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/users/:userId/consumers', userController.listConsumers);
router.post('/users/:userId/consumers', userController.addConsumer);
router.put('/users/:userId/consumers/:consumerId', userController.editConsumer);
router.delete('/users/:userId/consumers/:consumerId', userController.removeConsumer);

module.exports = router;