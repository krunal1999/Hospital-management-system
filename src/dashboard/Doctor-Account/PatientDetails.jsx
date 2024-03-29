import React, { useState } from "react";
import PatientProfile from "./PatientProfile ";
import doctoreService from "../../services/DoctorService";
import { useNavigate } from "react-router-dom";

const medicineList = [
  { name: "Paracetamol", price: 2.5 },
  { name: "Ibuprofen", price: 3.0 },
  { name: "Amoxicillin", price: 5.0 },
  // Add more medicines as needed
];

const PatientDetails = ({ patientData, doctorData, setTab }) => {
  const navigate = useNavigate();

  console.log(patientData?._id);
  let fees = Number(doctorData.ticketPrice);
  const [medicines, setMedicines] = useState([]);
  const [doctorFee, setDoctorFee] = useState(fees);
  const [selectedMedicine, setSelectedMedicine] = useState("");
  const [quantityInput, setQuantityInput] = useState(1);
  const [remarks, setRemarks] = useState("");
  const [visitStatus, setVisitStatus] = useState("");

  const addMedicine = () => {
    if (selectedMedicine) {
      const medicineInfo = medicineList.find(
        (medicine) => medicine.name === selectedMedicine
      );
      const newMedicine = {
        name: selectedMedicine,
        quantity: quantityInput,
        price: medicineInfo.price,
      };
      setMedicines([...medicines, newMedicine]);
      setSelectedMedicine("");
      setQuantityInput(1);
    }
  };

  const removeMedicine = (index) => {
    const updatedMedicines = [...medicines];
    updatedMedicines.splice(index, 1);
    setMedicines(updatedMedicines);
  };

  const totalCost =
    medicines.reduce(
      (total, medicine) => total + medicine.price * medicine.quantity,
      0
    ) + doctorFee;

  const handleSubmit = async () => {
    const prescriptionData = {
      medicines: medicines,
      doctorFee: doctorFee,
      remarks: remarks,
      visitStatus: visitStatus,
      totalCost: totalCost,
      doctorId: doctorData?._id,
      patientId: patientData?.patientId._id,
      visitedDate: new Date(),
      bookingId: patientData?._id,
      paidStatus: "unpaid"
    };
    const res = await doctoreService.givePrescription(prescriptionData);

    if (res.status === 200) {
      setTab("appointments");
    }
  };

  return (
    <>
      <PatientProfile patientData={patientData} />
      <div className="max-w-4xl mx-auto p-4 flex mt-4">
        <div className="mr-4 flex-1">
          <h2 className="text-2xl font-bold mb-4">Prescription Form</h2>
          <div className="mb-4">
            <label htmlFor="medicine" className="block font-bold mb-2">
              Medicine
            </label>
            <select
              id="medicine"
              value={selectedMedicine}
              onChange={(e) => setSelectedMedicine(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3"
            >
              <option value="">Select Medicine</option>
              {medicineList.map((medicine) => (
                <option key={medicine.name} value={medicine.name}>
                  {medicine.name} - ${medicine.price}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="quantity" className="block font-bold mb-2">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              value={quantityInput}
              onChange={(e) => setQuantityInput(parseInt(e.target.value))}
              className="w-full border border-gray-300 rounded-md py-2 px-3"
            />
          </div>
          <button
            onClick={addMedicine}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Add Medicine
          </button>
          <div className="mb-4">
            <label htmlFor="remarks" className="block font-bold mb-2">
              Remarks
            </label>
            <textarea
              id="remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3"
              rows="3"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="doctorFee" className="block font-bold mb-2">
              Doctor Fee
            </label>
            <input
              type="number"
              id="doctorFee"
              value={doctorFee}
              onChange={(e) => setDoctorFee(parseFloat(e.target.value))}
              className="w-full border border-gray-300 rounded-md py-2 px-3"
            />
          </div>

          <div className="mt-4 mb-4">
            <label htmlFor="visitStatus" className="block font-bold mb-2">
              Visit Status
            </label>
            <select
              id="visitStatus"
              value={visitStatus}
              onChange={(e) => setVisitStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3"
            >
              <option value="">Select Status</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Completed">Completed</option>
              <option value="No Show">No Show</option>
            </select>
          </div>
          <div className="mt-4">
            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
            >
              Submit
            </button>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-2">Prescribed Medicines</h3>
          <ul>
            <li className="flex justify-between items-center mb-2 border p-2 rounded">
              <span>{`doctor Fees`}</span>
              <span>{doctorFee} £</span>
            </li>
            {medicines.map((medicine, index) => (
              <li
                key={index}
                className="flex justify-between items-center mb-2 border p-2 rounded"
              >
                <span>
                  {medicine.name} ({medicine.quantity})
                </span>
                <span>${(medicine.price * medicine.quantity).toFixed(2)}</span>
                <button
                  onClick={() => removeMedicine(index)}
                  className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="mb-4">
            <label htmlFor="remarks" className="block font-bold mb-2">
              Remarks
            </label>
            <textarea
              id="remarks"
              value={remarks}
              className="w-full border border-gray-300 rounded-md py-2 px-3"
              rows="3"
              readOnly
            />
          </div>

          <div className="mt-4 text-right">
            <span className="font-bold">
              Total Cost: ${totalCost.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientDetails;
