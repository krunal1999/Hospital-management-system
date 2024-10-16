import React from "react";
import { formatDate } from "./../../utils/formatDate";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import conf from "../../config/config";

const CompletBookingTable = ({ booking }) => {
  const {
    visitStatus,
    visitedDate,
    totalCost,
    paidStatus,
    delivered,
    // bookingId: { date },
  } = booking;

  console.log("----------------------", booking);

  const navigate = useNavigate();
  const handleReview = async (booking) => {
    navigate(`/doctors/${booking.doctorId}?feedback=true`);
  };

  const handleClick = async (booking) => {
    console.log(booking);

    const stripe = await loadStripe(
      conf.stripePublicKey
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
    booking.bookingId && (
      <tbody className="text-gray-600 text-sm font-light">
        <tr className="border-b border-gray-200 hover:bg-gray-100">
          <td className="py-3 px-6">{formatDate(visitedDate)}</td>
          <td className="py-3 px-6 font-bold">{visitStatus}</td>
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

          {visitStatus !== "Cancelled" ? (
            <>
              <td className="py-2 px-2">
                {paidStatus !== "Paid" ? (
                  <button
                    onClick={() => handleClick(booking)}
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                      paidStatus === "Paid" || visitStatus === "Cancelled"
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={
                      paidStatus === "Paid" || visitStatus === "Cancelled"
                    }
                  >
                    Pay Now
                  </button>
                ) : (
                  <button
                    className="bg-green-500 text-white font-bold py-1 px-1 rounded"
                    disabled={
                      paidStatus === "Paid" || visitStatus === "Cancelled"
                    }
                  >
                    {delivered ? "Order Shipped" : "Order Pending"}
                  </button>
                )}
              </td>
              <td className="py-3 px-2 font-bold">
                <button
                  className="bg-green-500 text-white font-bold py-1 px-1 rounded"
                  onClick={() => handleReview(booking)}
                >
                  Give Feedback
                </button>
              </td>{" "}
            </>
          ) : (
            ""
          )}
        </tr>
      </tbody>
    )
  );
};

export default CompletBookingTable;
