import { useEffect, useState } from "react";
import api from "../../utils/api";
import LoadingScreen from "../../components/loadingScreen";
import { BiRefresh } from "react-icons/bi";
import toast from "react-hot-toast";

export default function AdminUsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const fetchUsers = async () => {
        setLoading(true);
        const token = localStorage.getItem("token");
        try {
            const res = await api.get(`/users/all/${pageNumber}/${pageSize}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            const userList = res.data.users || res.data || [];
            setUsers(userList);
            setTotalUsers(res.data.totalUsers || userList.length);
            setTotalPages(res.data.totalPages || 1);
        } catch (err) {
            console.error("Error fetching users:", err);
            toast.error(err?.response?.data?.message || "Users load කිරීමට නොහැකි විය");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [pageNumber, pageSize]);

    function handleBlockToggle(email) {
        const token = localStorage.getItem("token");
        api.put(`/users/state/${email}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(() => {
            toast.success("User status updated successfully");
            fetchUsers();
        })
        .catch((err) => {
            console.error(err);
            toast.error(err?.response?.data?.message || "Status update කිරීමට නොහැකි විය");
        });
    }

    function handleRoleToggle(email) {
        const token = localStorage.getItem("token");
        api.put(`/users/role/${email}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(() => {
            toast.success("User role updated successfully");
            fetchUsers();
        })
        .catch((err) => {
            console.error(err);
            toast.error(err?.response?.data?.message || "Role update කිරීමට නොහැකි විය");
        });
    }

    return (
        <div className="w-full h-full overflow-y-scroll flex flex-col items-center pb-[100px]">
            <div className="w-full min-h-[100px] bg-white shadow-2xl mb-10 rounded-lg flex p-4 items-center justify-between">
                <h1 className="text-2xl font-semibold">All Users</h1>
                <div className="h-full gap-4 flex items-center font-semibold">
                    {totalUsers} Users
                </div>                
            </div>

            {loading && <LoadingScreen />}

            <table className="w-full text-center rounded-lg overflow-hidden shadow-sm">
                <thead className="bg-accent text-white h-[40px]">
                    <tr>
                        <th className="w-[8%]">Profile</th>
                        <th className="w-[22%]">Email</th>
                        <th className="w-[20%]">Name</th>
                        <th className="w-[15%]">Role</th>
                        <th className="w-[15%]">Email Verified</th>
                        <th className="w-[20%]">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => {
                        // DB Schema compatibility check (role OR isAdmin)
                        const isAdmin = user.role === "admin" || user.isAdmin === true;
                        const displayName = user.name || `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'N/A';
                        const profilePic = user.profileImage || user.image || "https://cdn-icons-png.flaticon.com/512/149/149071.png";

                        return (
                            <tr className="odd:bg-gray-100 even:bg-white h-[60px] border-b" key={user.email || user._id}>
                                <td className="flex justify-center items-center h-[60px]">
                                    <img
                                        src={profilePic}
                                        alt="Profile"
                                        className="w-10 h-10 rounded-full object-cover border"
                                        onError={(e) => { e.target.src = "https://cdn-icons-png.flaticon.com/512/149/149071.png"; }}
                                    />
                                </td>
                                <td>{user.email}</td>
                                <td>{displayName}</td>
                                <td>
                                    <div className="flex h-[60px] justify-center items-center gap-2">
                                        <span className={`px-2 py-1 rounded text-xs font-semibold ${isAdmin ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                                            {isAdmin ? "Admin" : "Customer"}
                                        </span>
                                        <BiRefresh 
                                            className="cursor-pointer text-xl hover:text-accent transition-transform active:rotate-180" 
                                            title="Toggle Role" 
                                            onClick={() => handleRoleToggle(user.email)} 
                                        />
                                    </div>
                                </td>
                                <td>
                                    <span className={`px-2 py-1 rounded text-xs ${user.isEmailVerified ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                        {user.isEmailVerified ? "Yes" : "No"}
                                    </span>
                                </td>
                                <td>
                                    <div className="flex h-[60px] justify-center items-center gap-2">
                                        <span className={`px-2 py-1 rounded text-xs font-semibold ${user.isBlocked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                            {user.isBlocked ? "Blocked" : "Active"}
                                        </span>
                                        <BiRefresh 
                                            className="cursor-pointer text-xl hover:text-accent transition-transform active:rotate-180" 
                                            title="Toggle Block Status" 
                                            onClick={() => handleBlockToggle(user.email)} 
                                        />
                                    </div>
                                </td>                               
                            </tr>
                        );
                    })}
                </tbody>
            </table>

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