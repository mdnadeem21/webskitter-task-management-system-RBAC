const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller');
const TaskController = require('../controller/task.controller');
const { authenticateToken, authorizePermission } = require('../middleware/auth.permission.check');

// User registration route
router.post('/register', userController.registerUser);
// User login route
router.get('/login', userController.loginUser);


router.put('/update/user/role', authenticateToken, authorizePermission('user:update'), userController.assignRole);
router.delete('/delete/user/:id', authenticateToken, authorizePermission('user:delete'), userController.deleteUser);
router.get('/get/all/users', authenticateToken, authorizePermission('user:read'), userController.getAllUsers);
router.post('/create/task', authenticateToken, authorizePermission('task:create'), TaskController.createTask);
router.get('/get/all/tasks', authenticateToken, authorizePermission('task:read'), TaskController.getAllTasks);
router.put('/update/task/:id', authenticateToken, authorizePermission('task:update'), TaskController.updateTask);
router.delete('/delete/task/:id', authenticateToken, authorizePermission('task:delete'), TaskController.deleteTask);

module.exports = router;