const router = require('express').Router();
const userController = require('../Controllers/user.controller');

router.get('/', userController.getUser);

router.get('/add', userController.getAddUser);
router.post('/add-user', userController.addUser);

router.get('/edit-user/:userId', userController.getEditUser);
router.post('/edit-user', userController.editUser);

router.post('/delete-user/:userId', userController.deleteUser);

module.exports = router;
