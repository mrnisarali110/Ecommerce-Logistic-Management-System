const express = require('express');
const { Register, Login, SaveOrders, ResetPassword, getOrders,getTimelyOrders, getAllUsers, getAllOrders,getUserProfile,updateOrderStatus ,updatePassword} = require('../handlers/auth.handler');
const { authenticateToken } = require('../middleware/auth.middleware');

const authRoutes = express.Router();

authRoutes.post('/register', Register);
authRoutes.post('/login', Login);
authRoutes.post('/reset-password', ResetPassword);
authRoutes.post('/save-orders', authenticateToken, SaveOrders);
authRoutes.get('/get-orders', authenticateToken, getOrders);
authRoutes.get('/get-all-users', authenticateToken, getAllUsers);
authRoutes.get('/get-all-orders', authenticateToken, getAllOrders);
authRoutes.get('/get-user-profile', authenticateToken, getUserProfile);
authRoutes.put('/update-order-status/:id',authenticateToken,updateOrderStatus)
authRoutes.put('/update-password/:id',authenticateToken,updatePassword )
authRoutes.get('/get-sorted-order',authenticateToken,getTimelyOrders)

module.exports = authRoutes;