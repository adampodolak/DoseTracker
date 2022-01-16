import React from "react";
import { useState } from "react";
import "./App.css";
import ModalOne from "./Components/ModalOne";
import ModelTwo from "./Components/ModelTwo";
import { motion } from "framer-motion";

function Home() {
  const [openModal, setOpenModal] = useState(false);
  const [openModalTwo, setOpenModalTwo] = useState(false);
  return (
    <div className="App">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="projectName"
      >
        <h1>DoseTracker</h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="slogan"
      >
        <h2>A better way to track your medicine</h2>
      </motion.div>

      <div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{
            scale: 0.8,
            borderRadius: "100%",
          }}
          className="signup"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          Sign Up
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{
            scale: 0.8,
            borderRadius: "100%",
          }}
          className="login"
          onClick={() => {
            setOpenModalTwo(true);
          }}
        >
          Login
        </motion.button>
      </div>
      {openModal && <ModalOne closeModalOne={setOpenModal} />}
      {openModalTwo && <ModelTwo closeModalTwo={setOpenModalTwo} />}
    </div>
  );
}

export default Home;
