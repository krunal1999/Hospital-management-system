/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import doctoreService from "../../services/DoctorService";
import convertTime from "./../../utils/convertTime";
import conf from "../../config/config";
import authenticationService from "../../services/AuthenticationService";
import { toast } from "react-toastify";

const Appointments = ({ setTab, setPatientData }) => {
  let userData = JSON.parse(localStorage.getItem("user"));
  const storedStatus = localStorage.getItem("status") === "true" ? true : false;

  const [appointments, setAppointment] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await doctoreService.getDoctortAppointments(
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
    setTab("patient");
  };

  const handleCancel = async (item) => {

    console.log(item)

    const prescriptionData = {
      medicines: [],
      doctorFee: 0,
      remarks: "",
      visitStatus: "Cancelled",
      totalCost: 0,
      visitedDate: new Date(),
      paidStatus: "Cancelled",

      patientId: item?.patientId?._id,
      doctorId: item?.doctorId,
      bookingId: item?._id,
    };
    const res = await doctoreService.givePrescription(prescriptionData);

    if (prescriptionData.visitStatus === "Cancelled") {
      
      sendBookingMail(item);
    }

    if (res.status === 200) {
      setTab("appointments");
    }
  };

  const sendBookingMail = async (data) => {
    let subject = `Appointment Cancellation Notification
    `;
    let text = `Dear ${data?.patientId?.userId?.fullName},

    We regret to inform you that your appointment with ${userData?.fullName} scheduled for ${data?.date}  has been cancelled. We apologize for any inconvenience this may cause.

    Please feel free to book another slot at your convenience. If you need assistance or have any questions, please don't hesitate to contact us.

    We apologize again for any inconvenience and look forward to assisting you further.

    Best regards,
    Hospital Management System
    `;


    const options = {
      from: conf.sendigFrom,
      to: data?.patientId?.userId?.email,
      subject: subject,
      text: text,
    };
    

    const res = await authenticationService.sendMails(options);
    if (res.status === 200) {
      window.location.reload(true)
      setTab("appointments");
      toast.success("Email Send");
    }
  };

  // console.log(appointments[0].futureStartDate);
  // console.log(Date.now());

  const futureStartDate = new Date(appointments[0]?.futureStartDate); // Convert futureStartDate to a Date object
  const currentDate = new Date(Date.now()); // Get the current date

  // Compare the dates
  const isFuture = futureStartDate > currentDate; // Check if futureStartDate is in the future relative to currentDate

  console.log("Is futureStartDate in the future:", isFuture);

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
          appointments.map((item) => {
            const isFuture =
              new Date(item.futureStartDate) > new Date(Date.now());
            return (
              <tr
                key={item._id}
                className="bg-white border-b hover:bg-gray-50 "
              >
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
                  {!isFuture ? (
                    <button
                      onClick={(e) => clickHandler(item)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded"
                    >
                      Details
                    </button>
                  ) : 
                  (
                    <button
                      onClick={(e) => handleCancel(item)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded"
                    >
                      Cancel
                    </button>
                  )
                  }
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default Appointments;
