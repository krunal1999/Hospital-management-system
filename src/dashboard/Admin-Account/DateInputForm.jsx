import React, { useState } from "react";
import bookingService from "../../services/BookingService";
import { toast } from "react-toastify";

const DateInputForm = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform submission logic here
    console.log("Start Date:", startDate);
    console.log("End Date:", endDate);

    try {
      setLoading(true);
      const res = await bookingService.generateSlots({ startDate, endDate });
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

    try {
      setLoading(true);
      const res = await bookingService.deleteSlots({ startDate, endDate });
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
      
    </div>
  );
};

export default DateInputForm;
