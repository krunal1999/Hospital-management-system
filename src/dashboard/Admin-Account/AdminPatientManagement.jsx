import React, { useEffect, useState } from "react";
import PatientList from "./PatientList";
import doctoreService from "../../services/DoctorService";
import PaitentPaymentList from "./PatientPaymentList";

const AdminPatientManagement = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [patients, setPatients] = useState({ paid: [], unpaid: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await doctoreService.getAllPrescription();
        const { data } = response.data;
        const paidBills = data.filter((pt) => pt.paidStatus === "Paid");
        const unpaidBills = data.filter((pt) => pt.paidStatus !== "Paid");
        setPatients({ paid: paidBills, unpaid: unpaidBills });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  console.log(patients)

  return (
    <div className="container mx-auto py-2">
      <div className="flex justify mb-8 gap-1">
        <button
          className={`${
            activeTab === "pending"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } px-4 py-2 rounded-l-md`}
          onClick={() => setActiveTab("pending")}
        >
          Payment Pending
        </button>
        <button
          className={`${
            activeTab === "patient"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } px-4 py-2 rounded-l-md`}
          onClick={() => setActiveTab("patient")}
        >
          Deliver Order
        </button>

        <button
          className={`${
            activeTab === "allpatient"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } px-4 py-2 rounded-l-md`}
          onClick={() => setActiveTab("allpatient")}
        >
          All Patient
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {activeTab === "pending" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">pending List</h2>
            <PaitentPaymentList patient={patients.unpaid} />
          </div>
        )}
        {activeTab === "patient" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">patient List</h2>
            <PaitentPaymentList patient={patients.paid} />
          </div>
        )}
        {activeTab === "allpatient" && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">all List</h2>
            <PatientList />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPatientManagement;
