// const express = require('express');
// const { authenticateToken } = require('../middleware/auth.middleware');
// const User = require('../models/User'); // Make sure this path is correct

// const router = express.Router();

// router.get('/profile', authenticateToken, async (req, res) => {
//     try {
//         const user = await User.findById(req.user.id);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         res.status(200).json(user);
//     } catch (err) {
//         res.status(500).json({ message: 'Failed to fetch user', error: err.message });
//     }
// });

// module.exports = router;
