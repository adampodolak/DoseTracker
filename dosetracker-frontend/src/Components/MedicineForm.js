import React from "react";
import TimePicker from "react-time-picker";

function MedicineForm() {
  return (
    <div className="MedicineFormBackground">
      <div className="MedicineFormContainer">
        <div className="MFormHeader">Create a reminder</div>
        <div className="Medicine">
          <input type="text" placeholder="Medicine" />
        </div>
        <div className="Dosage">
          <input type="text" placeholder="Dosage" />
        </div>
        <div className="Interval">
          <input type="number" placeholder="Frequency of Reminders" />
        </div>
        <div className="Duration">
          <input type="number" placeholder="Number of Reminders" />
        </div>
        <div className="Time">
          <input type="text" placeholder="Minute/Hour (Military)" />
        </div>
        <div className="StartDate">
          <input type="date" placeholder="Start Date" />
        </div>
        <div className="PhoneNumber">
          <input type="text" placeholder="Phone Number" />
        </div>
        <div className="Submit">
          <button>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default MedicineForm;
