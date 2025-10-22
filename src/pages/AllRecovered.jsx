import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import Spinner from "../components/Spinner";
import { Link } from "react-router";

const AllRecovered = () => {
  const { user } = useContext(AuthContext);
  const [recoveredItems, setRecoveredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tableView, setTableView] = useState(
    localStorage.getItem("layoutView") === "table"
  );

  useEffect(() => {
    document.title = "Recovered Items";
  }, []);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(
          `${import.meta.env.VITE_API_URL}/items?userEmail=${user.email}&status=recovered`
        )
        .then((res) => {
          setRecoveredItems(res.data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [user?.email]);

  const toggleLayout = () => {
    const newLayout = !tableView;
    setTableView(newLayout);
    localStorage.setItem("layoutView", newLayout ? "table" : "card");
  };

  if (loading) return <Spinner></Spinner>;

  if (recoveredItems.length === 0) {
    return (
      <div className="text-center py-10 text-gray-600">
        <p>No recovered items found.</p>
        <Link to="/myItems" className="btn btn-primary mt-4">
          Back to My Items
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">All Recovered Items</h2>
        <button onClick={toggleLayout} className="btn btn-outline btn-sm">
          Change Layout
        </button>
      </div>

      {tableView ? (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Type</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recoveredItems.map((item) => (
                <tr key={item._id}>
                  <td>
                    <img
                      className="h-14 w-14 rounded-md object-fit"
                      src={item.thumbnail}
                      alt={item.title}
                    />
                  </td>
                  <td>{item.title}</td>
                  <td>{item.postType}</td>
                  <td>{item.date}</td>
                  <td>
                    <span className="badge badge-success">
                      {item.status || "Recovered"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recoveredItems.map((item) => (
            <div
              key={item._id}
              className="bg-base-100 shadow rounded-md p-4 border border-base-300"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="h-48 w-full object-fit rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600">Type: {item.postType}</p>
              <p className="text-sm text-gray-600">Date: {item.date}</p>
              <div className="mt-2">
                <span className="badge badge-success">
                  {item.status || "Recovered"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllRecovered;
