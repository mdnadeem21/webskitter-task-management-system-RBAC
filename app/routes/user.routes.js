const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const { authenticateToken, authorizePermission } = require('../middleware/auth.permission.check');

// User registration route
router.post('/register', userController.registerUser);
// User login route
router.post('/login', userController.loginUser);


router.put('/update/user/role', authenticateToken, authorizePermission('user:all'), userController.assignRole);
router.delete('/delete/user/:id', authenticateToken, authorizePermission('user:all'), userController.deleteUser);
router.post('/create/task', authenticateToken, authorizePermission('task:create'), userController.createTask);
router.get('/get/all/tasks', authenticateToken, authorizePermission('task:read'), userController.getAllTasks);
router.put('/update/task/:id', authenticateToken, authorizePermission('task:update'), userController.updateTask);
router.delete('/delete/task/:id', authenticateToken, authorizePermission('task:delete'), userController.deleteTask);

module.exports = router;