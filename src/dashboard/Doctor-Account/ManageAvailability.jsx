import React, { useEffect, useState } from "react";
import bookingService from "../../services/BookingService";
import { toast } from "react-toastify";

const ManageAvailability = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleBookingSelect = (event) => {
    const selectedBookingId = event.target.value;
    const booking = bookings.find((b) => b._id === selectedBookingId);
    setSelectedBooking(booking);
  };
  const storedStatus = localStorage.getItem("status") === "true" ? true : false;

  let doctorData = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform submission logic here
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);

    try {
      setLoading(true);
      const res = await bookingService.generateSlotsById(
        doctorData?.loggedUser._id,
        {
          startDate,
          endDate,
        }
      );
      console.log(res.data);
      console.log(res.status);
      if (res.status !== 200) {
        setLoading(false);
        toast.error(res.data.errors);
      }
      if (res.status === 200) {
        setLoading(false);
        toast.success(res.data.message);
      }
    } catch (errors) {
      setLoading(false);
      console.log(errors);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);
    let id = doctorData?.loggedUser._id;
    try {
      setLoading(true);
      const res = await bookingService.deleteSlotsById({
        id,
        startDate,
        endDate,
      });
      console.log(res.data);
      console.log(res.status);
      if (res.status !== 200) {
        setLoading(false);
        toast.error(res.data.errors);
      }
      if (res.status === 200) {
        setLoading(false);
        toast.success(res.data.message);
      }
    } catch (errors) {
      setLoading(false);
      console.log(errors);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await bookingService.bookedSlotsAll(
          doctorData?.loggedUser._id
        );
        console.log(res.data.data);
        setBookings(res.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    return () => {};
  }, [doctorData?.loggedUser._id]);

 
  return (
    <div className="max-w-md mx-auto mt-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="startDate" className="block text-gray-700">
            Start Date:
          </label>
          <input
            required
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="endDate" className="block text-gray-700">
            End Date:
          </label>
          <input
            required
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          {!loading ? (
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {`Generate Slots from ( ${startDate} ) to ( ${endDate} )`}
            </button>
          ) : (
            <button
              disabled
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              loading
            </button>
          )}
        </div>

        {!loading ? (
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            {`Delete Slots Slots from ( ${startDate} ) to ( ${endDate} )`}
          </button>
        ) : (
          <button
            disabled
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            loading
          </button>
        )}
      </form>

      <div className="w-full mt-4 gap-4">
        {storedStatus && (
          <div className="booking-list">
            <select
              className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={selectedBooking ? selectedBooking._id : ""}
              onChange={handleBookingSelect}
            >
              <option value="">Booked Dates</option>
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
    </div>
  );
};

export default ManageAvailability;
