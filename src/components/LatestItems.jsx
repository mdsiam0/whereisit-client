import { useEffect, useState } from "react";
import { Link } from "react-router";

const LatestItems = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch("https://where-is-it-server-nu.vercel.app/latestItems")
            .then((res) => res.json())
            .then((data) => setItems(data));
    }, []);

    return (
        <section className="mt-40">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-20 text-primary">
                    Latest Lost & Found Items
                </h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {items.map((item) => (
                        <div
                            key={item._id}
                            className="bg-base-200 shadow-xl rounded-xl overflow-hidden transition hover:shadow-2xl duration-300"
                        >
                            <figure>
                                <img
                                    src={item.thumbnail}
                                    alt={item.title}
                                    className="h-56 w-full object-fit"
                                    loading="lazy"
                                />

                            </figure>
                            <div className="p-6 text-center space-y-2">
                                <h3 className="text-xl font-semibold text-primary">{item.title}</h3>
                                <p className="text-sm text-gray-500">📍 {item.location}</p>
                                <p className="text-sm text-gray-500">
                                    📅 {new Date(item.date).toLocaleDateString()}
                                </p>

                                <div className="mt-4">
                                    <Link to={`/items/${item._id}`}>
                                        <button className="btn btn-sm btn-primary mx-auto">View Details</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link to="/allItems">
                        <button className="btn btn-wide btn-outline btn-primary">
                            See All Items
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default LatestItems;
