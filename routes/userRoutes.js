const express = require('express');
const router = express.Router();
const usersControllers = require('../controllers/users.controller');
router
  .route('/')
  .get(usersControllers.getAllUsers)
  .post(usersControllers.createNewUser)
  .patch(usersControllers.updateUser)
  .delete(usersControllers.deleteUser);

module.exports = router;
