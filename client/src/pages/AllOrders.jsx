import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useSelector } from "react-redux";
import axios from "axios"; // Import Axios
import {server} from '../server'

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        console.log(`Server Req: ${server}/api/orders/${currentUser._id}`);
        //const res = await fetch(`/api/orders/${currentUser._id}`);
        const response = await axios.get(`${server}/api/orders/${currentUser._id}`);
        setOrders(response.data); // Axios wraps the response data inside the `data` property
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        // If Axios encounters an error, it will be an AxiosError object which may have response data
        if (error.response) {
          // Handle the error response from the server
          console.error("Data:", error.response.data);
          console.error("Status:", error.response.status);
        }
      }
      setIsLoading(false);
    };
  
    if (currentUser && currentUser._id) {
      fetchOrders();
    }
    // Removed additional console.log for currentUser
  }, [currentUser]);

  return (
    <div className="container mx-auto mt-10">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <table className="min-w-full table-auto">
          <thead className="bg-green-500 text-white">
            <tr>
              <th className="px-4 py-2">Transaction ID</th>
              <th className="px-4 py-2">User ID</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Customer ID</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Init Order ID</th>
              <th className="px-4 py-2">Finished Order ID</th>
              <th className="px-4 py-2">Confirmed Order ID</th>
              <th className="px-4 py-2">Delivered Order ID</th>
              <th className="px-4 py-2">Details</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="px-4 py-2">{order.transactionId}</td>
                <td className="px-4 py-2">{order.userId}</td>
                <td className="px-4 py-2">{order.status}</td>
                <td className="px-4 py-2">{order.costumerId}</td>
                <td className="px-4 py-2">{new Date(order.date).toLocaleDateString()}</td>
                <td className="px-4 py-2">{order.initOrderId}</td>
                <td className="px-4 py-2">{order.finishedOrderId}</td>
                <td className="px-4 py-2">{order.ConfirmedOrderId}</td>
                <td className="px-4 py-2">{order.DeliveredOrderId}</td>
                <td className="px-4 py-2">
                  <Link to={`/order/${order.id}`}>
                    <AiOutlineArrowRight size={20} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllOrders;
