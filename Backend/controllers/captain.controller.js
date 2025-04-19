const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');


module.exports.registerCaptain = async (req, res, next) => {
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullname, email, password,vehicle } = req.body;

  const isCaptainIsAlreadyExists = await captainModel.findOne({ email });

  if (isCaptainIsAlreadyExists) {
    return res.status(400).json({ message: 'Captain already exists' });
  }

  const hashedPassword = await captainService.hashPassword(password);

  const captain = await captainService.createCaptain({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
  });


  const token = await captain.generateAuthToken();
  res.status(201).json({ token, captain });


}

module.exports.loginCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  const captain = await captainModel.findOne({ email }).select('+password');

  if (!captain) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const isMatch = await captain.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = await captain.generateAuthToken();
  res.status(200).json({ token, captain });
}
module.exports.getCaptainProfile = async (req, res, next) => {
  const captain = req.captain;
  res.status(200).json({ captain });
}
module.exports.logoutCaptain = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

  await blacklistTokenModel.create({ token });
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  await captainModel.findByIdAndUpdate(req.captain._id, { $pull: { tokens: token } });
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
} 