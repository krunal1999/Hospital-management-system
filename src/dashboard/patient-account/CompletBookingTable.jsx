import React from "react";
import { formatDate } from "./../../utils/formatDate";
import { loadStripe } from "@stripe/stripe-js";

const CompletBookingTable = ({ booking }) => {
  const {
    visitStatus,
    visitedDate,
    totalCost,
    paidStatus,
    delivered,
    bookingId: { date },
  } = booking;

  const handleClick = async (booking) => {
    console.log(booking);

    const stripe = await loadStripe(
      "pk_test_51OvnvN09UtBXmetzVgqe8h64mq46u3j36HhXMIu0QNZYkCcwFW6vUUTEHrSlG282S6JEMgA0NKXwzzSyfXeucowB00EF6SP3AT"
    );

    const body = {
      products: booking,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch(
      `http://localhost:8000/api/v1/create-checkout-session`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );

    const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
    }
  };

  return (
    <tbody className="text-gray-600 text-sm font-light">
      <tr className="border-b border-gray-200 hover:bg-gray-100">
        <td className="py-3 px-6">{formatDate(date)}</td>
        <td className="py-3 px-6 font-bold">{visitStatus}</td>
        <td className="py-3 px-6">{formatDate(visitedDate)}</td>
        <td className="py-3 px-6 font-bold text-green-700">{totalCost}</td>
        <td className="py-3 px-6">
          <span
            className={`px-2 py-1 rounded-full ${
              paidStatus === "Paid"
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }`}
          >
            {paidStatus}
          </span>
        </td>
        <td className="py-2 px-2">
          {paidStatus !== "Paid" ? (
            <button
              onClick={() => handleClick(booking)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              disabled={paidStatus === "Paid"}
            >
              Pay Now
            </button>
          ) : (
            <button
              className="bg-green-500 text-white font-bold py-1 px-1 rounded"
              disabled={paidStatus === "Paid"}
            >
              {delivered ? "Order Delievered" : "Order Pending"}
            </button>
          )}
        </td>
      </tr>
    </tbody>
  );
};

export default CompletBookingTable;
