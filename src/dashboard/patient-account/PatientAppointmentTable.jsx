import React from "react";

const PatientAppointmentTable = ({ booking }) => {
  const {
    date,
    bookingStatus,
    doctorId: { fullName, photo, specialization },
    startTime,
  } = booking;

  return (
    
          <tbody className="text-gray-600 text-sm font-light">
            <tr className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-4">{bookingStatus}</td>
              <td className="py-3 px-4">{date}</td>
              <td className="py-3 px-4 flex items-center">
                <img
                  src={photo}
                  alt={fullName}
                  className="w-10 h-10 rounded-full mr-2"
                />
                {fullName}
              </td>
              <td className="py-3 px-2">{specialization}</td>
              <td className="py-3 px-2">{startTime}</td>
            </tr>
          </tbody>
        
  );
};

export default PatientAppointmentTable;
