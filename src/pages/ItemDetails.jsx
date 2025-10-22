import { useParams } from "react-router";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const ItemDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [item, setItem] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [recoveryDate, setRecoveryDate] = useState(new Date());
  const [recoveryLocation, setRecoveryLocation] = useState("");

  useEffect(() => {
    document.title = "Details page";
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/items/${id}`)
      .then((res) => setItem(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  
  useEffect(() => {
    if (item?.location) {
      const fetchCoords = async () => {
        try {
          const res = await axios.get(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
              item.location
            )}`
          );
          if (res.data && res.data.length > 0) {
            setCoordinates({
              lat: parseFloat(res.data[0].lat),
              lng: parseFloat(res.data[0].lon),
            });
          } else {
            console.warn("⚠️ No coordinates found, using Dhaka fallback");
            setCoordinates({ lat: 23.8103, lng: 90.4125 }); // fallback
          }
        } catch (err) {
          console.error("Geocoding failed:", err);
          setCoordinates({ lat: 23.8103, lng: 90.4125 });
        }
      };
      fetchCoords();
    }
  }, [item?.location]);

  const handleRecoverySubmit = async () => {
    try {
      const recoveryInfo = {
        itemId: item._id,
        title: item.title,
        postType: item.postType,
        recoveryLocation,
        recoveryDate,
        recoveredBy: {
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
        },
      };

      await axios.post(`${import.meta.env.VITE_API_URL}/recover`, recoveryInfo);
      toast.success("✅ Item marked as recovered");
      setItem({ ...item, status: "recovered" });

      const dialog = document.getElementById("recovery_modal");
      if (dialog) dialog.close();
    } catch (err) {
      toast.error(err?.response?.data?.message || "❌ Recovery failed");
    }
  };

  if (!item) return <Spinner />;

  return (
    <div className="max-w-4xl md:mx-auto mx-4 mt-40  mb-20 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-cyan-100 to-blue-200">
      
      <img
        src={item.thumbnail}
        alt={item.title}
        className="rounded-md w-full max-h-96 object-cover"
      />
      <h2 className="text-2xl font-bold mt-4">{item.title}</h2>
      <p><strong>Type:</strong> {item.postType}</p>
      <p><strong>Description:</strong> {item.description}</p>
      <p><strong>Category:</strong> {item.category}</p>
      <p><strong>Location:</strong> {item.location}</p>
      <p><strong>Date:</strong> {item.date}</p>
      <p><strong>Posted by:</strong> {item.userName} ({item.userEmail})</p>

      {item.status === "recovered" ? (
        <p className="text-green-600 font-semibold mt-3">✅ Already Recovered</p>
      ) : (
        <button
          onClick={() => document.getElementById("recovery_modal").showModal()}
          className="btn btn-primary mt-4"
        >
          {item.postType === "Lost" ? "Found This!" : "This is Mine!"}
        </button>
      )}

     
      {coordinates && (
        <div className="mt-10">
          <h3 className="text-lg font-semibold mb-3">📍 Item Location Map</h3>
          <div className="h-96 w-full rounded-lg overflow-hidden border border-gray-300 shadow">
            <MapContainer
              center={[coordinates.lat, coordinates.lng]}
              zoom={13}
              scrollWheelZoom={false}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[coordinates.lat, coordinates.lng]}>
                <Popup>
                  {item.title} <br /> {item.location}
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      )}

      
      <dialog id="recovery_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box space-y-4">
          <h3 className="text-lg font-semibold">Recovery Confirmation</h3>

          <label className="block">
            Recovered Location:
            <input
              type="text"
              value={recoveryLocation}
              onChange={(e) => setRecoveryLocation(e.target.value)}
              className="input input-bordered w-full mt-1"
              placeholder="Enter recovery location"
            />
          </label>

          <label className="block">
            Recovered Date:
            <DatePicker
              selected={recoveryDate}
              onChange={(date) => setRecoveryDate(date)}
              className="input input-bordered w-full mt-1"
            />
          </label>

          <div className="bg-gray-100 p-3 rounded flex gap-4 items-center">
            <img className="w-14 h-14 rounded-full" src={user.photoURL} alt="" />
            <div>
              <p><strong>Name:</strong> {user.displayName}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
          </div>

          <div className="modal-action">
            <form method="dialog" className="flex gap-3">
              <button className="btn btn-sm btn-ghost">Cancel</button>
              <button
                type="button"
                className="btn btn-sm btn-success"
                onClick={handleRecoverySubmit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ItemDetails;
