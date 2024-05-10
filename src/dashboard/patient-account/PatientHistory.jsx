import React, { useState, useEffect } from "react";
import patientService from "../../services/patientService";
import { useParams } from "react-router-dom";
import PatientItem from "../../pages/patient/PatientItem";

const PatientHistory = ({pid}) => {
  const [patient, setPatient] = useState(null);
  const [block, setBlock] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const { id } = useParams();
  console.log("idd", id);

  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await patientService.getCurrentPatientByadmin(pid);

        const bookingHistory =
          await patientService.getPatientCompletedAppointments(pid);

        setBlock(response.data.data.isBlocked);
        setBookingDetails(bookingHistory.data.data);
        setPatient(response.data.data);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };
    fetchPatientData();
  }, [loading]);

//   const handleBlockUnblock = async () => {
//     try {
//       const response = await patientService.blockPatient(id, {
//         block: !block,
//       });
//       setBlock(response.data.data.isBlocked);
//       setLoading((prev) => !prev);
//     } catch (error) {
//       console.error("Error blocking/unblocking user:", error);
//       setLoading((prev) => !prev);
//     }
//   };

  if (!patient) {
    return <div>Loading...</div>;
  }

  //     console.log(patient.isBlocked);
  console.log(bookingDetails);

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="bg-white shadow-md rounded-lg p-6">

        <div className="mb-3">
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

export default PatientHistory;
