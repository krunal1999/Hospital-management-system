import React from "react";
import { useNavigate } from "react-router-dom";
import doctoreService from "../../services/DoctorService";
import { toast } from "react-toastify";

const PaitentPaymentList = ({ patient }) => {
  const navigate = useNavigate();

  const handleClick = (item) => {
    navigate(`/patient/${item.patientId._id}`);
  };

  const handleSend = async (item) => {
    try {
      const res = await doctoreService.updatePrescriptionById(item._id);
      if (res.status === 200) {
        toast.success("Order Send");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6">Name</th>
            <th className="py-3 px-6">total Pending</th>
            <th className="py-3 px-6">Paid Status</th>

            <th className="py-3 px-6">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {patient &&
            patient.length > 0 &&
            patient.map((pt) => (
              <tr
                key={pt._id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-center whitespace-nowrap">
                  {pt?.patientId?.userId?.fullName}
                </td>
                <td className="py-3 px-6 text-center whitespace-nowrap">
                  {pt.totalCost}
                </td>

                <td className="py-3 px-6 text-center">
                  <span
                    className={`inline-block py-1 px-3 font-bold rounded-full ${
                      pt.paidStatus === "Paid"
                        ? "bg-green-200 text-green-800"
                        : "bg-yellow-200 text-yellow-800"
                    }`}
                  >
                    {pt.paidStatus === "Paid" ? "Paid" : "Unpaid"}
                  </span>
                </td>

                <td className="py-3 px-6 text-center">
                  {pt.paidStatus !== "Paid" ? (
                    <button
                      onClick={() => handleClick(pt)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      View Profile
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSend(pt)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Send Order
                    </button>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaitentPaymentList;
