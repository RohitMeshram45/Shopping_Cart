"use client";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { CartContext } from "../Context/page";

const Payment = ( ) => {

    const { getTotal } = useContext(CartContext)

    const [amount, setAmount] = useState(Math.floor(getTotal())); // Assuming getTotal is a prop

    // Function to load Razorpay script
    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            document.body.appendChild(script);

            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
        });
    };

    // Function to handle payment process
    const handlePayment = async () => {
        const res = await loadRazorpayScript();

        if (!res) {
            toast.error("Razorpay SDK failed to load. Are you online?");
            return;
        }

        // Create order on backend
        const result = await axios.post(`${process.env.Backend_Url}/create_Order`, {
            amount: amount,
            currency: "INR",
        });

        if (!result) {
            toast.error("Server error. Are you online?");
            return;
        }

        const { amount: orderAmount, id: orderId, currency } = result.data;

        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Replace this with the environment variable
            amount: orderAmount,
            currency: currency,
            name: "MyCart",
            description: "Test Transaction",
            order_id: orderId,

            handler: function (response) {
                // Triggered on successful payment
                toast.success(`Payment ID: ${response.razorpay_payment_id}`);
                toast.success(`Order ID: ${response.razorpay_order_id}`);
                toast.success(`Signature: ${response.razorpay_signature}`);
            },
            prefill: {
                name: `${process.env.Name}`,
                email: `${process.env.Email}`,
                contact: "9999999999",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
            <h2 className="text-2xl font-semibold text-gray-700 text-center mb-4">
                Razorpay Payment Gateway
            </h2>
            <div className="mb-4">
                <label className="block text-gray-600 mb-2" htmlFor="amount">
                    Amount (INR)
                </label>
                <input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Amount"
                />
            </div>
            <button
                onClick={handlePayment}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
            >
                Pay Now
            </button>
        </div>
    );
};

export default Payment;
