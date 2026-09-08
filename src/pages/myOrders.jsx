import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Check, ChevronDown, ChevronUp, CircleAlert, Clock3, Package, Search, ShoppingBag, Truck, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import LoadingScreen from "../components/loadingScreen";
import getFormattedPrice from "../utils/price-formatter";
import formatTimestamp from "../utils/date-formatter";
import AdminOrderDataModal from "../components/orderDataModal";

const statusFilters = ["All", "Processing", "Shipped", "Delivered", "Cancelled"];
const steps = ["Placed", "Processing", "Shipped", "Delivered"];

function statusKey(status = "") {
    const value = status.toLowerCase();
    if (value.includes("cancel")) return "Cancelled";
    if (value.includes("deliver") || value.includes("complete")) return "Delivered";
    if (value.includes("ship")) return "Shipped";
    return "Processing";
}

function statusStyles(status) {
    return { Delivered: "bg-emerald-50 text-emerald-700 ring-emerald-600/10", Shipped: "bg-blue-50 text-blue-700 ring-blue-600/10", Processing: "bg-amber-50 text-amber-700 ring-amber-600/10", Cancelled: "bg-red-50 text-red-700 ring-red-600/10" }[status];
}

function statusIcon(status) {
    return { Delivered: Check, Shipped: Truck, Processing: Clock3, Cancelled: XCircle }[status] || Clock3;
}

function safeDate(value) {
    try { return formatTimestamp(value); } catch { return "Date unavailable"; }
}

export default function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [activeFilter, setActiveFilter] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [expandedOrderId, setExpandedOrderId] = useState(null);
    const [error, setError] = useState("");
    const [retryKey, setRetryKey] = useState(0);

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            setError("");
            const token = localStorage.getItem("token");
            try {
                const res = await api.get(`/orders/${pageNumber}/${pageSize}`, { headers: { Authorization: `Bearer ${token}` } });
                const orderList = Array.isArray(res.data) ? res.data : (res.data.orders || res.data.data || []);
                setOrders(orderList);
                setTotalOrders(res.data.totalOrders || orderList.length);
                setTotalPages(res.data.totalPages || 1);
            } catch (err) {
                console.error("Error fetching orders:", err);
                setError(err?.response?.data?.message || "We could not load your orders. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [pageNumber, pageSize, retryKey]);

    const visibleOrders = useMemo(() => orders.filter((order) => {
        const matchesStatus = activeFilter === "All" || statusKey(order.status) === activeFilter;
        const query = searchTerm.trim().toLowerCase();
        return matchesStatus && (!query || String(order.orderId || "").toLowerCase().includes(query));
    }), [orders, activeFilter, searchTerm]);

    return (
        <div className="min-h-[calc(100vh-72px)] bg-slate-50 px-4 py-6 pb-28 sm:px-6 lg:px-10 lg:py-10">
            <div className="mx-auto max-w-6xl">
                <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-blue-600">Order centre</p><h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Order history</h1><p className="mt-2 text-sm text-slate-500">Track every build, upgrade, and accessory on its way to you.</p></div><div className="flex w-fit items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm"><div className="rounded-xl bg-blue-50 p-2 text-blue-600"><Package size={20} /></div><div><p className="text-lg font-bold text-slate-950">{totalOrders}</p><p className="text-xs text-slate-500">total orders</p></div></div></div>

                <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4"><div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"><div className="flex gap-1 overflow-x-auto pb-1">{statusFilters.map((filter) => <button key={filter} onClick={() => setActiveFilter(filter)} className={`whitespace-nowrap rounded-lg px-3 py-2 text-xs font-bold transition sm:px-4 sm:text-sm ${activeFilter === filter ? "bg-blue-600 text-white shadow-sm shadow-blue-600/20" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`}>{filter}</button>)}</div><label className="relative block w-full lg:max-w-xs"><Search className="absolute left-3.5 top-3 text-slate-400" size={17} /><input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search by order ID" className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20" /></label></div></div>

                {loading && <div className="relative min-h-[300px]"><LoadingScreen /></div>}
                {!loading && error && <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center"><CircleAlert className="mx-auto text-red-500" size={28} /><p className="mt-3 text-sm font-semibold text-red-800">{error}</p><button onClick={() => setRetryKey((key) => key + 1)} className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700">Try again</button></div>}
                {!loading && !error && visibleOrders.length === 0 && <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600"><ShoppingBag size={30} /></div><h2 className="mt-5 text-xl font-bold text-slate-950">No orders found</h2><p className="mx-auto mt-2 max-w-sm text-sm text-slate-500">{orders.length ? "Try a different filter or order ID." : "Your next upgrade is only a few clicks away."}</p>{!orders.length && <Link to="/products" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700">Browse products <ArrowRight size={17} /></Link>}</div>}

                {!loading && !error && <div className="space-y-5">{visibleOrders.map((order) => { const currentStatus = statusKey(order.status); const StatusIcon = statusIcon(currentStatus); const currentStep = currentStatus === "Cancelled" ? -1 : steps.indexOf(currentStatus); const isExpanded = expandedOrderId === order.orderId; return <article key={order.orderId} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"><div className="border-b border-slate-100 p-5 sm:p-6"><div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><div className="flex flex-wrap items-center gap-3"><h2 className="text-base font-bold text-slate-950">#{order.orderId}</h2><span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${statusStyles(currentStatus)}`}><StatusIcon size={13} /> {order.status || currentStatus}</span></div><p className="mt-2 text-xs text-slate-500">Placed {safeDate(order.date)}</p></div><div className="text-left sm:text-right"><p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total amount</p><p className="mt-1 text-xl font-black text-blue-700">{getFormattedPrice(order.totalAmount)}</p></div></div>
                    {currentStatus !== "Cancelled" && <div className="mt-7 grid grid-cols-4 gap-1">{steps.map((step, index) => { const StepIcon = index === 0 ? Check : index === 1 ? Clock3 : index === 2 ? Truck : Package; const active = index <= currentStep; return <div key={step} className="relative text-center"><div className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full border-2 ${active ? "border-blue-600 bg-blue-600 text-white" : "border-slate-200 bg-white text-slate-300"}`}><StepIcon size={14} /></div>{index < steps.length - 1 && <div className={`absolute left-[calc(50%+18px)] right-[calc(-50%+18px)] top-4 h-0.5 ${index < currentStep ? "bg-blue-600" : "bg-slate-200"}`} /> }<p className={`relative mt-2 text-[10px] font-bold sm:text-xs ${active ? "text-slate-700" : "text-slate-400"}`}>{step}</p></div>})}</div>}
                </div><div className="space-y-3 p-5 sm:p-6">{(order.items || []).slice(0, 3).map((item, index) => <div key={index} className="flex items-center gap-3"><div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-slate-50"><img src={item.product?.image || item.product?.images?.[0] || ""} alt={item.product?.name || "Product"} className="h-full w-full object-contain" /></div><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold text-slate-800">{item.product?.name || "Product item"}</p><p className="mt-1 text-xs text-slate-500">Qty {item.qty || 1} · {getFormattedPrice(item.product?.price)}</p></div><p className="text-sm font-bold text-slate-800">{getFormattedPrice((item.product?.price || 0) * (item.qty || 1))}</p></div>)}{(order.items || []).length > 3 && <p className="text-xs font-semibold text-slate-400">+ {(order.items || []).length - 3} more items</p>}<div className="flex flex-col justify-between gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center"><div className="text-xs text-slate-500"><span className="font-semibold text-slate-700">Delivering to:</span> {order.city || order.addressLine1 || "Address on file"}</div><div className="flex items-center gap-2"><button onClick={() => setExpandedOrderId(isExpanded ? null : order.orderId)} className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700">{isExpanded ? "Hide summary" : "View summary"}{isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}</button><AdminOrderDataModal isAdmin={false} order={order} refresh={() => setPageNumber(1)} /></div></div>{isExpanded && <div className="mt-4 grid gap-3 rounded-xl bg-slate-50 p-4 text-xs text-slate-600 sm:grid-cols-2"><p><span className="font-bold text-slate-800">Contact:</span> {order.email || "Not provided"}</p><p><span className="font-bold text-slate-800">Phone:</span> {order.phone || "Not provided"}</p><p className="sm:col-span-2"><span className="font-bold text-slate-800">Shipping address:</span> {[order.addressLine1, order.addressLine2, order.city].filter(Boolean).join(", ") || "Address on file"}</p><p><span className="font-bold text-slate-800">Tracking:</span> {order.trackingNumber || "Tracking will appear after dispatch"}</p></div>}</div></article>; })}</div>}

                {!loading && !error && orders.length > 0 && <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:flex-row"><select value={pageSize} onChange={(e) => { setPageSize(Number(e.target.value)); setPageNumber(1); }} className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/20"><option value={2}>2 per page</option><option value={5}>5 per page</option><option value={10}>10 per page</option><option value={20}>20 per page</option></select><div className="flex items-center gap-3 text-sm text-slate-500"><button disabled={pageNumber === 1} onClick={() => setPageNumber(pageNumber - 1)} className="rounded-lg border border-slate-200 px-3 py-2 font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40">Previous</button><span>Page {pageNumber} of {totalPages}</span><button disabled={pageNumber === totalPages} onClick={() => setPageNumber(pageNumber + 1)} className="rounded-lg border border-slate-200 px-3 py-2 font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40">Next</button></div></div>}
            </div>
        </div>
    );
}
