import React from "react";
import MedicineForm from "./MedicineForm";
import "./MedicineForm.css";

function MedicineFormModal({ closeModal }) {
  return (
    <div className="Background">
      <div className="Container">
        <div className="closeButton">
          <button onClick={() => closeModal(false)}>x</button>
        </div>
        <div className="MedicineForm">
          <MedicineForm />
        </div>
      </div>
    </div>
  );
}

export default MedicineFormModal;
