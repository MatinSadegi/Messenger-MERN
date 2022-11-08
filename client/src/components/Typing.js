import React from "react";
import { motion } from "framer-motion";
import { typing, parentTyping } from "../utils/variants";

const Typing = ({ currentChat, name }) => {
    console.log(name)
  return (
    <div className="typing__container">
      <motion.p initial="off" animate="on" variants={parentTyping}>
        <span>{name}</span> <span>is</span> typing <motion.span variants={typing}>
          .
        </motion.span>
        <motion.span variants={typing}>.</motion.span>
        <motion.span variants={typing}>.</motion.span>
      </motion.p>
    </div>
  );
};
export default Typing;
