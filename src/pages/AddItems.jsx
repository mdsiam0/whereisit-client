import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
const AddItems = () => {
    const { user } = useContext(AuthContext);

    const [date, setDate] = useState(new Date());

    useEffect(() => {
      document.title = "Add Items";
    }, []);

    const handleAddItem = async (e) => {
        e.preventDefault();
        const form = e.target;

        const newItem = {
            postType: form.postType.value,
            thumbnail: form.thumbnail.value,
            title: form.title.value,
            description: form.description.value,
            category: form.category.value,
            location: form.location.value,
            date: date.toISOString().split("T")[0],
            userName: user?.displayName,
            userEmail: user?.email,
            userPhoto: user?.photoURL,
        };
        // console.log("Form Data Submitted:", newItem);
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/items`, newItem);
            if (res.data.insertedId) {
                toast.success("Item added successfully!");
                form.reset();
                setDate(new Date()); 
            }
        } catch (error) {
            toast.error("Failed to add item");
            console.error(error);
        }
    };

    return (
        <div className="max-w-3xl mx-auto my-20 p-6 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6">Add Lost or Found Item</h2>
            <form onSubmit={handleAddItem} className="grid grid-cols-1 gap-4">
                <div>
                    <label>Post Type</label>
                    <select name="postType" defaultValue="Lost" className="w-full input input-bordered">
                        <option value="Lost">Lost</option>
                        <option value="Found">Found</option>
                    </select>
                </div>

                <div>
                    <label>Image URL</label>
                    <input name="thumbnail" type="url" placeholder="Image URL" required className="w-full input input-bordered" />
                </div>

                <div>
                    <label>Title</label>
                    <input name="title" type="text" placeholder="Item Title" required className="w-full input input-bordered" />
                </div>

                <div>
                    <label>Description</label>
                    <textarea name="description" placeholder="Item Description" required className="w-full textarea textarea-bordered"></textarea>
                </div>

                <div>
                    <label>Category</label>
                    <select name="category" className="w-full input input-bordered">
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
                    <input name="location" type="text" placeholder="Where was it lost/found?" required className="w-full input input-bordered" />
                </div>

                <div>
                    <label className="block">Lost or found Date</label>
                    <DatePicker
                        selected={date}
                        onChange={(date) => setDate(date)}
                        className="w-full input input-bordered"
                        dateFormat="yyyy-MM-dd"
                    />
                </div>

                <div>
                    <label>Your Name</label>
                    <input value={user?.displayName || ""} readOnly className="w-full input input-bordered" />
                </div>

                <div>
                    <label>Your Email</label>
                    <input value={user?.email || ""} readOnly className="w-full input input-bordered" />
                </div>

                <button type="submit" className="btn btn-primary mt-4 w-full">Add Post</button>
            </form>
        </div>
    );
};

export default AddItems;
