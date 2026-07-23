import { useEffect, useState } from "react";
import api from "../utils/api";
import LoadingScreen from "../components/loadingScreen";
import getFormattedPrice from "../utils/price-formatter";
import formatTimestamp from "../utils/date-formatter";
import AdminOrderDataModal from "../components/orderDataModal";

export default function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            const token = localStorage.getItem("token");
            try {
                const res = await api.get(`/orders/${pageNumber}/${pageSize}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                
                const orderList = Array.isArray(res.data) ? res.data : (res.data.orders || res.data.data || []);
                setOrders(orderList);
                setTotalOrders(res.data.totalOrders || orderList.length);
                setTotalPages(res.data.totalPages || 1);
            } catch (err) {
                console.error("Error fetching orders:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [pageNumber, pageSize]);

    return (
        <div className="w-full h-full flex flex-col items-center">
            <div className="w-full h-[100px] bg-white shadow-2xl mb-10 rounded-lg flex p-4 items-center justify-between">
                <h1 className="text-2xl font-semibold">My Orders</h1>
                <div className="h-full gap-4 flex items-center">
                    {totalOrders} Orders
                </div>                
            </div>

            {loading ? (
                <LoadingScreen />
            ) : (
                <table className="w-full text-center rounded-lg overflow-hidden">
                    <thead className="bg-accent text-white h-[40px]">
                        <tr>
                            <th className="w-[10%]">Order ID</th>
                            <th className="w-[15%]">Email</th>
                            <th className="w-[20%]">Name</th>
                            <th className="w-[10%]">City</th>
                            <th className="w-[10%]">Phone</th>
                            <th className="w-[10%]">Status</th>
                            <th className="w-[10%]">Date</th>
                            <th className="w-[10%]">Total</th>
                            <th className="w-[5%]">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan="9" className="py-6 text-gray-500">No orders found.</td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr className="odd:bg-gray-100 even:bg-white h-[60px]" key={order.orderId}>
                                    <td>{order.orderId}</td>
                                    <td>{order.email}</td>
                                    <td>{order.firstName} {order.lastName}</td>
                                    <td>{order.city}</td>
                                    <td>{order.phone}</td>
                                    <td>
                                        <span className={`px-2 py-1 rounded text-sm ${order.status === 'Completed' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td>{formatTimestamp(order.date)}</td>
                                    <td>{getFormattedPrice(order.totalAmount)}</td>
                                    <td>
                                        <div className="w-full flex justify-center items-center gap-4">
                                            <AdminOrderDataModal isAdmin={false} order={order} refresh={() => setPageNumber(1)} />
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}

            <div className="p-2 fixed bottom-4 bg-white shadow-2xl flex justify-center items-center gap-4 rounded-lg">
                <select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPageNumber(1); }} className="h-full px-4 border-r outline-none">
                    <option value={2}>2 per page</option>
                    <option value={5}>5 per page</option>
                    <option value={10}>10 per page</option>
                    <option value={20}>20 per page</option>
                </select>
                <div className="h-full flex items-center justify-center gap-4">
                    <button disabled={pageNumber === 1} onClick={() => setPageNumber(pageNumber - 1)} className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50">Previous</button>
                    <span>Page {pageNumber} of {totalPages}</span>
                    <button disabled={pageNumber === totalPages} onClick={() => setPageNumber(pageNumber + 1)} className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50">Next</button>
                </div>
            </div>
        </div>
    );
}