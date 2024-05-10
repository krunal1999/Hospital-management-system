import React, { useState, useEffect } from "react";
import patientService from "../../services/patientService";
import { useParams } from "react-router-dom";
import PatientItem from "./PatientItem";

const PatientProfile = () => {
  const [patient, setPatient] = useState(null);
  const [block, setBlock] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const { id } = useParams();
  console.log("idd", id);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await patientService.getCurrentPatientByadmin(id);

        const bookingHistory =
          await patientService.getPatientCompletedAppointments(id);

        setBlock(response.data.data.isBlocked);
        setBookingDetails(bookingHistory.data.data);
        setPatient(response.data.data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };
    fetchPatientData();
  }, [loading]);

  const handleBlockUnblock = async () => {
    try {
      const response = await patientService.blockPatient(id, {
        block: !block,
      });
      setBlock(response.data.data.isBlocked);
      setLoading((prev) => !prev);
    } catch (error) {
      console.error("Error blocking/unblocking user:", error);
      setLoading((prev) => !prev);
    }
  };

  if (!patient) {
    return <div>Loading...</div>;
  }

  //     console.log(patient.isBlocked);
  console.log(bookingDetails);

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Patient Profile</h2>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Name</h3>
            <p>{patient.userId.fullName}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Age</h3>
            <p>{patient.age}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Email</h3>
            <p>{patient.userId.email}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Phone</h3>
            <p>{patient.phone}</p>
          </div>
        </div>

        <button
          className={`px-4 py-2 rounded-md font-semibold ${
            patient.isBlocked
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
          onClick={handleBlockUnblock}
        >
          {patient.isBlocked ? "Unblock User" : "Block User"}
        </button>

        <br />
        <br />

        <div className="mb-3">
          <h1 className="text-xl font-semibold ">Patient History</h1>

          <ul className="mt-[16px]">
            {bookingDetails.map((item, index) => (
              <PatientItem item={item} key={index} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
