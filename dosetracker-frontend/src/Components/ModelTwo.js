import React from "react";
import "./ModalOne.css";
import LogInForm from "./LogInForm";
import { motion } from "framer-motion";

function ModelTwo({ closeModalTwo }) {
  return (
    <div className="ModalBackground">
      <motion.div
        initial={{
          scale: 0,
        }}
        animate={{
          scale: 1,
        }}
        className="ModalContainer"
      >
        <div className="CloseButton">
          <button onClick={() => closeModalTwo(false)}>x</button>
        </div>
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          className="Form"
        >
          <LogInForm />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default ModelTwo;
