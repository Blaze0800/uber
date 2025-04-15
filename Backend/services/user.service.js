const userModel = require('../models/user.model');


module.exports.hashPassword = async (password) => {
  const bcrypt = require('bcryptjs');
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}
module.exports.registerUser= async(firstname,lastname, email,password )=>{

  if(!firstname || !email || !password){
    throw new error ('All fields are required');
  }

  const user = userModel.create({
    fullname: {
      firstname,
      lastname
    },
    email,
    password
  })

  return user;


}
