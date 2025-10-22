import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

const AllItems = () => {
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/items`)
            .then(res => setItems(res.data))
            .catch(err => console.error(err));
    }, []);
    useEffect(() => {
      document.title = "All Items";
    }, []);


    const filteredItems = items.filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.location.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-center mb-8">All Lost & Found Items</h2>

            <div className="mb-6 text-center">
                <input
                    type="text"
                    placeholder="Search by title or location"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="input input-bordered w-full max-w-md"
                />
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.length > 0 ? (
                    filteredItems.map(item => (
                        <div key={item._id} className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl shadow-md p-5 space-y-3 relative">
                            <span className={`absolute top-3 right-3 px-3 py-1 text-xs font-bold rounded-full
                                  ${item.postType === "Found" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
                                {item.postType}
                            </span>

                            <img src={item.thumbnail} alt={item.title} className="h-60 w-full object-fit rounded-md" />
                            <h3 className="text-xl font-semibold">{item.title}</h3>
                            <p><span className="font-medium">Location:</span> {item.location}</p>
                            <p><span className="font-medium">Date:</span> {item.date}</p>
                            <Link to={`/items/${item._id}`}>
                                <button className="btn  btn-primary mt-2 w-full ">View Details</button>
                            </Link>
                        </div>

                    ))
                ) : (
                    <p className="text-center text-gray-500 col-span-3">No items found.</p>
                )}
            </div>
        </div>
    );
};

export default AllItems;
