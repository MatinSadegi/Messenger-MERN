import express from 'express';
import bcrypt from 'bcryptjs';
import { signIn, signUp } from '../controllers/users.js';
import { check, body } from 'express-validator';
import User from '../models/user.js';
const router = express.Router();

router.post(
  '/signup',
  body('firstName')
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage('First Name is Empty'),
  body('lastName')
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage('Last Name is Empty'),
  check('email')
    .isEmail()
    .withMessage('invalid E-mail')
    .custom(async (value) => {
      const existingUser = await User.findOne({ value });
      if (existingUser) {
        throw new Error('E-mail already in use');
      }
    }),
  body('password')
    .isLength({ min: 5 })
    .withMessage('must be at least 5 chars long')
    .custom((value, { req }) => {
      if (value !== req.body.confirmPassword) {
        throw new Error('Password confirmation is incorrect');
      }
    }),
  signUp
);
router.post(
  '/signin',
  check('email')
    .isEmail()
    .withMessage('invalid E-mail')
    .custom(async (value) => {
      const existingUser = await User.findOne({ value });
      if (!existingUser) {
        throw new Error('The entered E-mail is not existing ');
      }
    }),
  body('password')
    .isLength({ min: 5 })
    .withMessage('must be at least 5 chars long')
    .custom(async(value, { req }) => {
      const existingUser = await User.findOne({email:req.body.email});
      console.log(existingUser);
      const isPasswordCorrect = await bcrypt.compare(
        value,
        existingUser.password
      );
      if(!isPasswordCorrect){
        throw new Error(' Password is incorrect');
      }
    }),
  signIn
);

export default router;
