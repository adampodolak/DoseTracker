import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import MedicineForm from "./MedicineForm";
import MedicineFormModal from "./MedicineFormModal";
import Card from "./Card";
import "./Card.css";

function ModalProfile() {
  const [open, setOpen] = useState(false);
  return (
    <div className="pModalBackground">
      <div className="pModalContainer">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{
            scale: 0.8,
            borderRadius: "100%",
          }}
          onClick={() => {
            setOpen(true);
          }}
        >
          <div className="plus">+</div>
          <div className="AddMedicine">Add Medicine</div>
        </motion.button>
      </div>
      {open && <MedicineFormModal closeModal={setOpen} />}
      <Card />
    </div>
  );
}

export default ModalProfile;
