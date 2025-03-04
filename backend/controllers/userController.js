import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
// Route for user register
const userRegister = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    //checking is user already exist or not
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res.json({ message: "User already exist", success: false });
    }
    //validate user email and password
    if (!validator.isEmail(email)) {
      return res.json({ message: "Please enter valid email", success: false });
    }
    if (password.length < 8) {
      return res.json({ message: "Enter strong password", success: false });
    }
    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create new user
    const newUser = new userModel({
      fullname,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();

    const token = generateToken(user._id);
    res.json({ message: "Register successful", success: true, token,user:{fullname,email}});
  } catch (error) {
    console.log("Failed to register user:", error);
    res.json({ message: error.message, success: false });
  }
};

// Route for user login
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ message: "User does not exist", success: false });
    }
    const isMatch = await bcrypt.compare(password, user?.password);
    if (isMatch) {
      const token = generateToken(user._id);
      res.json({ message: "Login successful", success: true, token,user:{fullname:user.fullname,email:user.email} });
    } else {
      res.json({ message: "Invalid email or password", success: false });
    }
  } catch (error) {
    console.log("Failed to login:", error);
    res.json({ message: error.message, success: false });
  }
};

// Route for user admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      return res.json({ success: true, token });
    } else {
      return res.json({ message: "Invalid email or password:", success: false });
    }
  } catch (error) {
    console.log("failed to admin login:", error);
    res.json({ message: error.message, success: false });
  }
};

export { userLogin, userRegister, adminLogin };
