const bcrypt = require("bcrypt");
const { User } = require("../models");
const { AppError } = require("../utils/AppError")

exports.register = async (data) => {
  console.log("data in register",data)
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await User.create({
    ...data,
    password: hashedPassword,
  });

  const userResponse = user.toJSON();
  delete userResponse.password;

  return userResponse;
};

exports.login = async (email, password) => {

  console.log("received in login service", email, password)
  const user = await User.findOne({
    where: { email },
  });

  console.log("finded user from DB", user);

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  console.log("send user buy auth service", user);
  return user;
};