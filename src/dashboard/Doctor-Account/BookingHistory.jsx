/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import doctoreService from "../../services/DoctorService";
import convertTime from "./../../utils/convertTime";

const BookingHistory = ({ setTab, setPatientData }) => {
  let userData = JSON.parse(localStorage.getItem("user"));
  const storedStatus = localStorage.getItem("status") === "true" ? true : false;

  const [appointments, setAppointment] = useState([]);
  console.log(appointments);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await doctoreService.getDoctortAppointmentsCompleted(
          userData?.loggedUser._id
        );
        setAppointment(res?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    return () => {};
  }, [userData?.loggedUser._id]);

  const clickHandler = (item) => {
    setPatientData(item);
    setTab("doctorHistoryPatient");
  };

  return (
    <table className="w-full text-sm text-left text-gray-500 ">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
        <tr>
          <th scope="col" className="px-5 py-3">
            Name
          </th>
          <th scope="col" className="px-2 py-3">
            Gender
          </th>
          <th scope="col" className="px-5 py-3">
            Status
          </th>
          <th scope="col" className="px-5 py-3">
            Booked on
          </th>
          <th scope="col" className="px-5 py-3">
            Time
          </th>
          <th scope="col" className="px-5 py-3">
            Info
          </th>
        </tr>
      </thead>
      <tbody>
        {appointments &&
          appointments.map((item) => (
            <tr key={item._id} className="bg-white border-b  hover:bg-gray-50 ">
              <th
                scope="row"
                className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap "
              >
                <img
                  className="w-10 h-10 rounded-full"
                  src={item.patientId?.photo}
                  alt="Jese image"
                />
                <div className="pl-3">
                  <div className="text-base font-semibold">
                    {item.patientId?.userId?.fullName
                      ? item.patientId?.userId?.fullName
                      : ""}
                  </div>
                  <div className="font-normal text-gray-500">
                    {item.patientId.userId.email}
                  </div>
                </div>
              </th>

              <td className="px-2 py-4">{item.patientId?.gender}</td>

              <td className="px-2 py-4">
                {item.bookingStatus && (
                  <div className="flex items-center">
                    <div className="rounded bg-green-300 m-2 p-1">
                      {item.bookingStatus}
                    </div>
                  </div>
                )}
                {/* {!item.isPaid && (
                  <div className="flex items-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>
                    Unpaid
                  </div>
                )} */}
              </td>
              <td className="px-5 py-4">{item.date}</td>
              <td className="px-6 py-4">{convertTime(item.startTime)}</td>
              <td className="px-5 py-4">
                <button
                  onClick={(e) => clickHandler(item)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded"
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default BookingHistory;
