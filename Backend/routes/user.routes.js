const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');



console.log('User routes loaded');

router.post('/register', [
  body('email').isEmail().withMessage('Invalid Email'),
  body('fullname.firstname').isLength({min:3}).withMessage('First name must be at least 3 characters long'),
  body('password').isLength({min:6}).withMessage('Password is required'),
],
userController.registerUser
);

router.get('/test', (req, res) => {
  res.send('User routes working');
});


router.post('/login', [
  body('email').isEmail().withMessage('Invalid Email'),
  body('password').isLength({min:6}).withMessage('Password is required'),
],
userController.loginUser
)


router.get('/profile',authMiddleware.authUser, userController.getUserProfile);

router.get('/logout', authMiddleware.authUser, userController.logoutUser);




module.exports = router;