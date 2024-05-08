const express = require('express');
const UserController = require('../controllers/User');
const router = express.Router();

 router.get('/get-all-users', UserController.findAll);
 router.get('/get-user', UserController.findOne);
 router.post('/create', UserController.create);
 router.patch('/update', UserController.update);
 router.delete('/delete', UserController.destroy);
module.exports = router;