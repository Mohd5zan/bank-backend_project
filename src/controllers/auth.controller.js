const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const emailServices = require("../services/email.service");

/**
 * - User register controller
 * - POST  /api/auth/register
 */
async function userRegisterController(req, res) {
  const { name, email, password } = req.body;
  const isExists = await userModel.findOne({
    email,
  });
  if (isExists) {
    return res.status(422).json({
      Message: "user already exists with email",
      status: "Failed",
    });
  }
  const user = await userModel.create({
    name,
    email,
    password,
  });
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "3d" },
  );
  res.cookie("token", token);

  res.status(201).json({
    Message: "User Created Successfully",
    User: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });

  await emailServices.sendRegistrationEmail(user.email, user.name);
}

/**
 * - User Login controller
 * -POST /api/auth/login
 */
async function userLoginController(req, res) {
  const { name, email, password } = req.body;

  const User = await userModel
    .findOne({
      $or: [{ name }, { email }],
    })
    .select("+password");
  if (!User) {
    return res.status(401).json({
      Message: "Invalid credentials",
    });
  }
  const isValidPassword = await User.comparePassword(password);
  if (!isValidPassword) {
    return res.status(401).json({
      Message: "Invalid Credentials",
    });
  }
  const token = jwt.sign(
    {
      id: User._id,
      email: User.email,
    },
    process.env.JWT_SECRET_KEY,
  );

  res.cookie("token", token);
  return res.status(200).json({
    Message: "Login Successfull",
    User: {
      email: User.email,
      name: User.name,
    },
  });
}

module.exports = { userRegisterController, userLoginController };
