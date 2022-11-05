import express from "express";
import bcrypt from "bcryptjs";
import { signIn, signUp, getUsers } from "../controllers/users.js";
import { check, body } from "express-validator";
import { protect } from "../middleware/auth.js";
import User from "../models/user.js";
const router = express.Router();  
//SignUp
router.post( 
  "/signup", 
  body("firstName") 
    .not()
    .isEmpty()
    .trim()
    .escape() 
    .withMessage("First Name is Empty"),
  body("lastName")
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage("Last Name is Empty"),
  body("email")
    .isEmail()
    .withMessage("invalid E-mail")
    .custom(async (value) => {
      const existingUser = await User.findOne({email:value})
      console.log(value)
      console.log(existingUser);
      if (existingUser) {
        throw new Error("E-mail already in use");
      }
    }),
  body("password") 
    .isLength({ min: 5 })
    .withMessage("must be at least 5 chars long"),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match password");
    }
    return true;
  }),
  signUp
);
//SignIn
router.post(
  "/signin",
  check("email")
    .isEmail()
    .withMessage("invalid E-mail")
    .custom(async (value) => {
      const existingUser = await User.findOne({ email:value });
      if (!existingUser) {
        throw new Error("The entered e-mail is not existing ");
      }
    }),
  body("password")
    .isLength({ min: 5 })
    .withMessage("must be at least 5 chars long")
    .custom(async (value, { req }) => {
      const existingUser = await User.findOne({ email: req.body.email });
      const isPasswordCorrect = await bcrypt.compare(
        value,
        existingUser.password
      );
      if (!isPasswordCorrect) {
        throw new Error(" Password is incorrect");
      }
    }),
  signIn
);
router.get("/", protect, getUsers);

export default router;
 