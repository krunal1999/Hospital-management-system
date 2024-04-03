import React, { useEffect, useState } from "react";
import PatientProfile from "./PatientProfile ";
import doctoreService from "../../services/DoctorService";

function DoctorHistoryPatient({ patientData }) {
  console.log("bookingId", patientData._id);
  const [info, setInfo] = useState(null);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true);
        const res = await doctoreService.getPrescriptionByBookingId(
          patientData?._id
        );
        console.log("asdasdasd", res.data.data[0]);
        setInfo(res?.data?.data[0]);
        setloading(false);
      } catch (error) {
        console.log(error);
        setloading(false);
      }
    };
    fetchData();
    return () => {};
  }, [patientData?._id]);

  return (
    <>
      <PatientProfile patientData={patientData} />
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Prescription Details</h2>
        {loading && <p>Loading...</p>}
        {!loading && info && (
          <>
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Medicines:</h3>
              <ul className="list-disc list-inside">
                {info.medicines &&
                  info.medicines.map((medicine) => (
                    <li key={medicine._id} className="flex justify-between">
                      <span>{medicine.name}</span>
                      <span>
                        Quantity: {medicine.quantity} | Price: £{medicine.price}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="mb-4">
              <p className="text-gray-700">
                <span className="font-semibold">Doctor Fee:</span> £
                {info.doctorFee}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Remarks:</span> {info.remarks}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Visit Status:</span>{" "}
                {info.visitStatus}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Total Cost:</span> £
                {info.totalCost}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Visited Date:</span>{" "}
                {new Date(info.visitedDate).toLocaleString()}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Paid Status:</span>{" "}
                {info.paidStatus}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Delivered:</span>{" "}
                {info.delivered ? "Yes" : "No"}
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default DoctorHistoryPatient;
