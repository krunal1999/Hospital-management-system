import React from "react";
import bookingService from "../../services/BookingService";
import { toast } from "react-toastify";

const PatientAppointmentTable = ({ booking }) => {
  const {
    date,
    bookingStatus,
    doctorId: { fullName, photo, specialization },
    startTime,
  } = booking;

  const handleCancel = async () => {
    // console.log(booking._id)

    const bookingData = {
      ...booking,
      patientId: null,
      bookingStatus: "Available",
      isAvaliable: true,
    };
    const res = await bookingService.bookAppointment(booking._id, bookingData);

    console.log(res.data.statusCode)
    if(res.data.statusCode === 200){
      window.location.reload(true);
      toast.success("Booking has been Cancelled")
    }else{
      toast.error("fail to cancel booking")
    }
    
  };

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
        <td className="py-2 px-2">
          <button
            onClick={() => handleCancel(booking)}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
          >
            Cancel
          </button>
        </td>
      </tr>
    </tbody>
  );
};

export default PatientAppointmentTable;
