const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const {validationResult} = require('express-validator');
const blackListTokenModel = require('../models/blacklistToken.model');






module.exports.registerUser= async(req,res ,next )=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(422).json({errors: errors.array()});
  }
  console.log(req.body);

  const {fullname, email, password} = req.body;

  const hashPassword = await userService.hashPassword(password);

  const user = await userModel.create({
    fullname: {
      firstname: fullname.firstname,
      lastname: fullname.lastname,
    },
    email,
    password: hashPassword
  });

  const token = await user.generateAuthToken();

  res.status(201).json({token, user });


}


module.exports.loginUser = async (req, res, next) => {
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  const user=await userModel.findOne({email}).select('+password');

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const isMatch = await user.comparePassword(password);

  if(!isMatch) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  const token = await user.generateAuthToken();

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  res.status(200).json({ token, user });
}

module.exports.getUserProfile = async (req, res, next) => {
  
  res.status(200).json(req.user);
}; 

module.exports.logoutUser = async (req, res, next) => {
  res.clearCookie('token');
  const token = req.cookies.token || req.headers.authorization.split(' ')[1];

  await blackListTokenModel.create({token});

  res.status(200).json({ message: 'Logged out successfully' });
}


