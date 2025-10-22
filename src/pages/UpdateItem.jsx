import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Spinner from "../components/Spinner";

const UpdateItem = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Update Page";
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/items/${id}`)
      .then((res) => {
        const formattedDate = new Date(res.data.date);
        setItem({ ...res.data, date: formattedDate });
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to fetch item data");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setItem({ ...item, date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/items/${id}`, {
        ...item,
        date: item.date.toISOString().split("T")[0],
      });
      toast.success("Item updated successfully!");
      navigate("/myItems");
    } catch (error) {
      toast.error("Failed to update item");
    }
  };

  if (loading || !item) return <Spinner></Spinner>;

  return (
    <div className="max-w-3xl mx-auto my-20 p-6 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Update Lost or Found Item</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        
        <div>
          <label>Post Type</label>
          <select name="postType" value={item.postType} onChange={handleChange} className="w-full input input-bordered">
            <option value="Lost">Lost</option>
            <option value="Found">Found</option>
          </select>
        </div>

        <div>
          <label>Image URL</label>
          <input
            name="thumbnail"
            type="url"
            value={item.thumbnail}
            onChange={handleChange}
            required
            className="w-full input input-bordered"
          />
        </div>

        <div>
          <label>Title</label>
          <input
            name="title"
            type="text"
            value={item.title}
            onChange={handleChange}
            required
            className="w-full input input-bordered"
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={item.description}
            onChange={handleChange}
            required
            className="w-full textarea textarea-bordered"
          ></textarea>
        </div>

        <div>
          <label>Category</label>
          <select name="category" value={item.category} onChange={handleChange} className="w-full input input-bordered">
            <option value="Documents">Documents</option>
            <option value="Gadgets">Gadgets</option>
            <option value="Pets">Pets</option>
            <option value="Jewelry">Jewelry</option>
            <option value="Clothing">Clothing</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label>Location</label>
          <input
            name="location"
            type="text"
            value={item.location}
            onChange={handleChange}
            required
            className="w-full input input-bordered"
          />
        </div>

        <div>
          <label className="block">Lost or Found Date</label>
          <DatePicker
            selected={item.date}
            onChange={handleDateChange}
            className="w-full input input-bordered"
            dateFormat="yyyy-MM-dd"
            required
          />
        </div>

        <div>
          <label>Your Name</label>
          <input
            value={user?.displayName || ""}
            readOnly
            className="w-full input input-bordered"
          />
        </div>

        <div>
          <label>Your Email</label>
          <input
            value={user?.email || ""}
            readOnly
            className="w-full input input-bordered"
          />
        </div>

        <button type="submit" className="btn btn-primary mt-4 w-full">
          Update Post
        </button>
      </form>
    </div>
  );
};

export default UpdateItem;
