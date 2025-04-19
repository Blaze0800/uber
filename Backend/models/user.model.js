const e = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    fullname: {
      firstname: {
        type: String,
        required: true,
        minlength: [3, 'First name must be at least 3 characters long'],
      },
      lastname: {
        type: String,
      
        minlength: [3, 'Last name must be at least 3 characters long'],
      }
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select : false,
    },
    socketId: {
      type: String,
    },
    
  })


userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id}, process.env.JWT_SECRET, {expiresIn: '24h'});
  return token;
}
userSchema.methods.comparePassword = async function (password) {
  const user = this;
  const isMatch = await bcrypt.compare(password, user.password);
  return isMatch;
}

userSchema.methods.hashPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}


const userModel = mongoose.model('user', userSchema);
module.exports = userModel;


