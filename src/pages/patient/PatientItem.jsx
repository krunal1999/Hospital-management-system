import { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

/* eslint-disable react/prop-types */
const PatientItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  let visiteDate = new Date(item?.bookingId?.date);

  function toggleAccordion() {
    setIsOpen(!isOpen);
  }

  return (
    (item?.bookingId && 
    <div className="p-3 lg:p-5 rounded-[12px] border border-solid border-[#D9DCE2] mb-5 cursor-pointer">
      <div
        className="flex items-center justify-between gap-5 "
        onClick={toggleAccordion}
      >
        <h4 className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 font-[700] text-headingColor">
          {`${visiteDate.toDateString()} -- ${
            item?.bookingId.bookingStatus
          } -- ${item.paidStatus} -- ${item.totalCost}`}
        </h4>
        <div
          className={`${
            isOpen && "bg-[#0067FF] text-white border-none"
          } w-7 h-7 lg:w-8 lg:h-8 rounded border border-solid border-[#141F21] flex items-center justify-center`}
        >
          {isOpen ? <AiOutlineMinus /> : <AiOutlinePlus />}
        </div>
      </div>
      {isOpen && (
        <div className=" mt-4">
          <div className="text-[14px] leading-6 lg:text-[16px] lg:leading-7 font-[400] text-textColor">
            <div className="flex overflow-x-auto">
              <div className="w-1/3">
                <table className="table-auto min-w-full border-collapse border border-gray-300">
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">
                        Doctor Name
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">
                        Specialization
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">
                        Start Time
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">
                        Visit Status
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">
                        Total Cost
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">
                        paidStatus
                      </td>
                    </tr>

                    <tr>
                      <td className="border border-gray-300 px-4 py-2">
                        Remark
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">
                        Medicines
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="w-2/3">
                <table className="table-auto min-w-full border-collapse border border-gray-300">
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">
                        {item.bookingId.doctorId?.fullName}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">
                        {item.bookingId.doctorId?.specialization}
                      </td>
                    </tr>

                    <tr>
                      <td className="border border-gray-300 px-4 py-2">
                        {item.bookingId.startTime}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">
                        {item.visitStatus}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">
                        {item.totalCost}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">
                        {item.paidStatus}
                      </td>
                    </tr>

                    <tr>
                      <td className="border border-gray-300 px-4 py-2">
                        {item.remarks}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">
                        <ul>
                          {item.medicines &&
                            item.medicines.map((medicine) => (
                              <li key={medicine._id}>
                                <strong>{medicine.name}</strong> - Quantity:{" "}
                                {medicine.quantity}, Price: {medicine.price}
                              </li>
                            ))}
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>)
  );
};

export default PatientItem;
