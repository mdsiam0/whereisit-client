import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router";

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
  document.title = "Register Page";
}, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const photoURL = form.photoURL.value.trim();

    // Password validation
    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;
    if (!uppercase.test(password)) {
      return toast.error("Password must have at least one uppercase letter");
    }
    if (!lowercase.test(password)) {
      return toast.error("Password must have at least one lowercase letter");
    }
    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters long");
    }

    try {
      const userCredential = await register(email, password);
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL,
      });

      toast.success("Registration successful!");
      form.reset();
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        
      <div className="max-w-md w-full p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="photoURL"
            placeholder="Photo URL"
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Register
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
