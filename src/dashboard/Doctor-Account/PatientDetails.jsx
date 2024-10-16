import React, { useState } from "react";
import PatientProfile from "./PatientProfile ";
import doctoreService from "../../services/DoctorService";
import { useNavigate } from "react-router-dom";
import conf from "../../config/config";
import authenticationService from "../../services/AuthenticationService";
import { toast } from "react-toastify";

// const medicineList = [
//   { name: "Paracetamol", price: 2.5 },
//   { name: "Ibuprofen", price: 3.0 },
//   { name: "Amoxicillin", price: 5.0 },
//   // Add more medicines as needed
// ];
const medicineList = [
  { name: "Paracetamol", price: 2.5 },
  { name: "Ibuprofen", price: 3.0 },
  { name: "Amoxicillin", price: 5.0 },
  { name: "Aspirin", price: 2.0 },
  { name: "Loratadine", price: 4.5 },
  { name: "Cetirizine", price: 3.5 },
  { name: "Omeprazole", price: 6.0 },
  { name: "Simvastatin", price: 7.5 },
  { name: "Metformin", price: 4.0 },
  { name: "Losartan", price: 5.5 },
  { name: "Atorvastatin", price: 8.0 },
  { name: "Levothyroxine", price: 6.5 },
  { name: "Metoprolol", price: 4.5 },
  { name: "Amlodipine", price: 5.0 },
  { name: "Warfarin", price: 3.5 },
  { name: "Fluoxetine", price: 6.5 },
  { name: "Sertraline", price: 7.0 },
  { name: "Escitalopram", price: 7.5 },
  { name: "Venlafaxine", price: 8.5 },
  { name: "Duloxetine", price: 9.0 },
  { name: "Pregabalin", price: 10.0 },
  { name: "Gabapentin", price: 9.5 },
  { name: "Ranitidine", price: 3.0 },
  { name: "Furosemide", price: 4.5 },
  { name: "Hydrochlorothiazide", price: 5.0 },
  { name: "Tamsulosin", price: 6.0 },
  { name: "Metoclopramide", price: 3.5 },
  { name: "Diazepam", price: 4.0 },
  { name: "Tramadol", price: 5.5 },
  
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

    let paidStatus

    if(visitStatus === "Cancelled"){
      paidStatus = "Cancelled"
    }else{
      paidStatus = "unpaid"
    }

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
      paidStatus: paidStatus,
    };
    const res = await doctoreService.givePrescription(prescriptionData);

    if (prescriptionData.visitStatus === "Cancelled") {
      sendBookingMail(patientData.patientId.userId.email);
    }

    if (res.status === 200) {
      setTab("appointments");
    }
  };

  const sendBookingMail = async (data) => {
    let subject = `Appointment Cancellation Notification
    `;
    let text = `Dear ${patientData.patientId.userId.fullName},

    We regret to inform you that your appointment with ${doctorData.fullName} scheduled for ${patientData.date}  has been cancelled. We apologize for any inconvenience this may cause.

    Please feel free to book another slot at your convenience. If you need assistance or have any questions, please don't hesitate to contact us.

    We apologize again for any inconvenience and look forward to assisting you further.

    Best regards,
    Hospital Management System
    `;

    const options = {
      from: conf.sendigFrom,
      to: data,
      subject: subject,
      text: text,
    };

    const res = await authenticationService.sendMails(options);
    if (res.status === 200) {
      
      toast.success("Email Send");
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
                  {medicine.name} - £{medicine.price}
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
              min={1}
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
              Additional Fee
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
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
              <option value="NoShow">No Show</option>
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
              <span>{`Additional Fees`}</span>
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
                <span>£{(medicine.price * medicine.quantity).toFixed(2)}</span>
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
              Total Cost: £{totalCost.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientDetails;
