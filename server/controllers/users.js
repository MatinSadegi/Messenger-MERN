import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import User from '../models/user.js';
import generateToken from '../utils/generateToken.js';

//SignUp
export const signUp = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(422).json({ errors: error.array()[0] });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    res.status(200).json({ user, token: generateToken(user._id) });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong...' });
  }
};
//SignIn
export const signIn = async (req, res) => {
  const { email } = req.body;
  const existingUser = await User.findOne({ email });
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(422).json({ errors: error.array()[0] });
  }
  res
    .status(200)
    .json({ existingUser, token: generateToken(existingUser._id) });
};
