import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Spinner from "../components/Spinner";

const MyItems = () => {
    const { user } = useContext(AuthContext);
    const [myItems, setMyItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      document.title = "My Items";
    }, []);

    useEffect(() => {
        if (user?.email) {
            axios
                .get(`${import.meta.env.VITE_API_URL}/items?userEmail=${user.email}`)
                .then((res) => {
                    setMyItems(res.data);
                    setLoading(false);
                })
                .catch(() => {
                    toast.error("Failed to fetch items");
                    setLoading(false);
                });
        }
    }, [user?.email]);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });

        if (!result.isConfirmed) return;

        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/items/${id}`);
            Swal.fire('Deleted!', 'Your item has been deleted.', 'success');

            setMyItems(prev => prev.filter(item => item._id !== id));
        } catch {
            toast.error("Failed to delete item");
        }
    };

    if (loading) return <Spinner></Spinner>;

    if (myItems.length === 0) {
        return (
            <div className="text-center py-10 text-gray-600">
                <p>You haven’t added any items yet.</p>
                <Link to="/addItems" className="btn btn-primary mt-4">
                    Add Lost or Found Item
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">My Items</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myItems.map((item) => (
                            <tr key={item._id}>
                                <td><img className="h-14 w-14 rounded-md" src={item.thumbnail} alt="" /></td>
                                <td>{item.title}</td>
                                <td>{item.postType}</td>
                                <td>{item.date}</td>
                                <td>
                                    <span
                                        className={`badge ${item.status === "recovered"
                                            ? "badge-success"
                                            : "badge-warning"
                                            }`}
                                    >
                                        {item.status || "Pending"}
                                    </span>
                                </td>
                                <td className="align-middle">
                                    <div className="flex gap-2 items-center h-full">
                                        <Link
                                            to={`/updateItems/${item._id}`}
                                            className="btn btn-sm btn-info"
                                        >
                                            Update
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="btn btn-sm btn-error"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyItems;
