const express = require('express');
const UserController = require('../controllers/User');
const router = express.Router();

  router.get('/get-all-users', UserController.findAll);
  router.get('/get-user', UserController.getUserById);
  router.post('/create', UserController.create);
  router.post('/update', UserController.updateUser);
 router.delete('/delete', UserController.deleteUser);
module.exports = router;