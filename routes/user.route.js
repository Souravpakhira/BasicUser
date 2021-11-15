const router = require('express').Router();
const userController = require('../Controllers/user.controller');

router.get('/get-user', userController.getUser);

router.post('/add-user', userController.addUser);

router.put('/edit-user/:userId', userController.editUser);

router.delete('/delete-user/:userId', userController.deleteUser);

module.exports = router;
