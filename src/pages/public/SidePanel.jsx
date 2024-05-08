/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import bookingService from "../../services/BookingService.js";
import convertTime from "../../utils/convertTime.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import doctoreService from "./../../services/DoctorService";
import conf from "../../config/config.js";
import authenticationService from "../../services/AuthenticationService.js";
import moment from "moment-timezone";

const SidePanel = ({ ticketPrice, timeSlots, doctorId, doctorInfo }) => {
  const storedStatus = localStorage.getItem("status") === "true" ? true : false;
  let userData = JSON.parse(localStorage.getItem("user"));

  // console.log(doctorInfo.isApproved);
  // console.log(doctorInfo.isAllowed);

  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await bookingService.getAvailbleBookingByDrID(doctorId);
        console.log("booking" , res.data.data);
        setBookings(res.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    return () => {};
  }, [doctorId]);

  const bookingHandler = async () => {
    // setLoading(true);
    const bookingData = {
      ...selectedBooking,
      patientId: userData?.loggedUser._id,
      bookingStatus: "Booked",
      isAvaliable: false,
    };
    const res = await bookingService.bookAppointment(
      selectedBooking._id,
      bookingData
    );

    // console.log(res.data.data);
    sendBookingMail(res.data.data);
    // eventDetails(res.data.data);

    if (res.status === 200) {
      setLoading(false);
      toast.success(res.data.message);
      navigate("/patient/profile");
    } else {
      setLoading(false);
      toast.error(res.data.message);
    }
  };

  function createGoogleCalendarLink(eventDetails) {
    const { title, description, start, end, location } = eventDetails;
    const startDateTime = new Date(start)
      .toISOString()
      .replace(/-|:|\.\d+/g, "");
    const endDateTime = new Date(end).toISOString().replace(/-|:|\.\d+/g, "");
    const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE`;
    const eventUrl = `&text=${encodeURIComponent(
      title
    )}&details=${encodeURIComponent(
      description
    )}&dates=${startDateTime}/${endDateTime}&location=${encodeURIComponent(
      location
    )}`;

    return calendarUrl + eventUrl;
  }

  const sendBookingMail = async (data) => {
    const Details = {
      title: `Appointment Confirmation for ${data.date}`,
      description: "Please arrive 15 min before start time",
      start: data.futureStartDate,
      end: data.futureEndDate,
      location: "London, UK",
    };

    const calendarLink = createGoogleCalendarLink(Details);

    let subject = `Appointment Confirmation for ${data.date}
    `;
    let text = `Dear ${userData.fullName},

    I hope this email finds you well. This is to confirm your appointment on ${
      data.date
    } from ${data.startTime} to ${data.endTime}.
    
    Here are the details of your appointment:
    
    Date: ${data.date}
    Time: ${data.startTime} to ${data.endTime}
    Status: ${data.bookingStatus}
    Please note that this appointment has already been ${data.bookingStatus.toLowerCase()} and is not available for rescheduling.

    Add to Calender : ${calendarLink}
    
    If you have any questions or need to make changes, please feel free to contact us at your earliest convenience.
    
    We look forward to seeing you at the appointment.
    
    Best regards,
    MediCare+
    `;

    const options = {
      from: conf.sendigFrom,
      to: userData.email,
      subject: subject,
      text: text,
    };

    const res = await authenticationService.sendMails(options);
    if (res.status === 200) {
      toast.success("Email Send");
    }

    // console.log(subject);
    // console.log(text);
  };

  const handleBookingSelect = (event) => {
    const selectedBookingId = event.target.value;
    const booking = bookings.find((b) => b._id === selectedBookingId);
    setSelectedBooking(booking);
  };

  const approvehandler = async () => {
    try {
      setLoading(true);
      const res = await doctoreService.updateDoctorApprove(doctorId);
      if (res.status === 200) {
        setLoading(false);
        navigate("/admin/profile");
        toast.success("Doctor Has Been Approved");
      } else {
        setLoading(false);
        toast.error("Failed To Update Doctor");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const bookingAvailablehandler = async () => {
    try {
      setLoading(true);
      const res = await doctoreService.updateDoctorAvailable(doctorId);
      if (res.status === 200) {
        setLoading(false);
        navigate("/admin/profile");
        toast.success("Doctor Has Been Approved");
      } else {
        setLoading(false);
        toast.error("Failed To Update Doctor");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" shadow-panelShadow p-3 lg:p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text__para mt-0 font-semibold">Minimum Fees Price</p>
        <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
          {ticketPrice} £
        </span>
      </div>

      <div className="mt-[30px]">
        <p className="text__para mt-0 font-semibold text-headingColor">
          Available Time Slots:
        </p>
        <ul className="mt-3">
          {timeSlots?.map((item, index) => (
            <li key={index} className="flex items-center justify-between mb-2">
              <p className="text-[15px] leading-6 text-textColor font-semibold">
                {item.day.charAt(0).toUpperCase() + item.day.slice(1)}:
              </p>
              <p className="text-[15px] leading-6 text-textColor font-semibold">
                {convertTime(item.startingTime)}
                <span> - </span>
                {convertTime(item.endingTime)}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <br></br>
      <hr></hr>

      <div className="w-full mt-4 gap-4">
        {storedStatus && (
          <div className="booking-list">
            <select
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={selectedBooking ? selectedBooking._id : ""}
              onChange={handleBookingSelect}
            >
              <option value="">Select a booking</option>
              {bookings.length > 0 &&
                bookings.map((booking) => (
                  <option key={booking._id} value={booking._id}>
                    {`${booking.date} - ${booking.startTime} - ${booking.endTime}`}
                  </option>
                ))}
            </select>

            {selectedBooking && (
              <div className="selected-booking mt-4 p-4 bg-gray-100 rounded-md">
                <div className="date font-semibold text-gray-800">
                  {selectedBooking.date}
                </div>
                <div className="time text-gray-600">{`${selectedBooking.startTime} - ${selectedBooking.endTime}`}</div>
              </div>
            )}
          </div>
        )}
      </div>

      {!loading && userData.role === "patient" ? (
        <button onClick={bookingHandler} className="px-2 btn w-full rounded-md">
          {storedStatus ? "Book Appointment" : "Login To Book Appointment"}
        </button>
      ) : (
        <>
          {!loading ? (
            <>
              {doctorInfo.isApproved === "pending" ? (
                <button
                  onClick={approvehandler}
                  className="px-2 btn w-full rounded-md bg-yellow-600"
                  disabled={userData.role === "doctor"}
                >
                  Click To Approve
                </button>
              ) : (
                <button
                  className="px-2 btn w-full rounded-md bg-green-600"
                  disabled
                >
                  Approved
                </button>
              )}

              {doctorInfo.isAllowed ? (
                <button
                  onClick={bookingAvailablehandler}
                  className="px-2 btn w-full rounded-md bg-green-600"
                  disabled={userData.role === "doctor"}
                >
                  Doctor Available
                </button>
              ) : (
                <button
                  onClick={bookingAvailablehandler}
                  className="px-2 btn w-full rounded-md bg-red-600"
                  disabled={userData.role === "doctor"}
                >
                  Doctor Not Available
                </button>
              )}
            </>
          ) : (
            <button disabled className="px-2 btn w-full rounded-md">
              {"loading...."}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default SidePanel;
