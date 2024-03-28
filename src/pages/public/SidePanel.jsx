/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import bookingService from "../../services/BookingService.js";
import convertTime from "../../utils/convertTime.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SidePanel = ({ ticketPrice, timeSlots, doctorId }) => {
  const storedStatus = localStorage.getItem("status") === "true" ? true : false;
  let userData = JSON.parse(localStorage.getItem("user"));

  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await bookingService.getAvailbleBookingByDrID(doctorId);
        console.log(res.data.data);
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
    setLoading(true);
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
    console.log(res.data);
    if (res.status === 200) {
      setLoading(false);
      toast.success(res.data.message);
      navigate("/patient/profile");
    } else {
      setLoading(false);
      toast.error(res.data.message);
    }
  };

  const handleBookingSelect = (event) => {
    const selectedBookingId = event.target.value;
    const booking = bookings.find((b) => b._id === selectedBookingId);
    setSelectedBooking(booking);
  };

  return (
    <div className=" shadow-panelShadow p-3 lg:p-5 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text__para mt-0 font-semibold">Minimum Ticket Price</p>
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
              {bookings.map((booking) => (
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
      {!loading ? (
        <button onClick={bookingHandler} className="px-2 btn w-full rounded-md">
          {storedStatus ? "Book Appointment" : "Login To Book Appointment"}
        </button>
      ) : (
        <button onClick={bookingHandler} className="px-2 btn w-full rounded-md">
          {"loading...."}
        </button>
      )}
    </div>
  );
};

export default SidePanel;
