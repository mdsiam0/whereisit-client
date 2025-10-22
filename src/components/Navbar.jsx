import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/logo.png";
import { FiMenu } from "react-icons/fi";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        logout().then(() => {
            // console.log("Logged out");
        });
    };

    return (
        <nav className="shadow px-4 py-4 md:px-6 bg-[#f5f3fc] ">
            <div className="flex justify-between items-center max-w-[1500px] mx-auto relative">
                {/* Logo */}
                <NavLink to="/" className="text-xl font-bold text-blue-600 flex items-center gap-2">
                    <img className="w-10 h-10" src={logo} alt="Logo" />
                    <h2 className="text-2xl md:text-3xl">WhereIsIt</h2>
                </NavLink>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center space-x-4 text-lg">
                    <NavLink to="/" className="font-bold">Home</NavLink>
                    <NavLink to="/allItems" className="font-bold">Lost & Found</NavLink>

                    {user ? (
                        <>
                            {/* Avatar Dropdown */}
                            <div
                                className="relative"
                                onMouseEnter={() => setShowTooltip(true)}
                                onMouseLeave={() => setShowTooltip(false)}
                            >
                                <img
                                    src={user.photoURL || "https://via.placeholder.com/40"}
                                    alt={user.displayName || "User"}
                                    className="w-10 h-10 rounded-full border cursor-pointer"
                                    onClick={() => setShowDropdown(!showDropdown)}
                                />
                                {showTooltip && (
                                    <div className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs rounded px-2 py-1 z-10">
                                        {user.displayName || "User"}
                                    </div>
                                )}

                                {showDropdown && (
                                    <div
                                        onMouseLeave={() => setShowDropdown(false)}
                                        className="absolute right-0 mt-2 bg-white shadow-lg rounded w-48 z-50"
                                    >
                                        <NavLink to="/addItems" className="block px-4 py-2 text-sm hover:bg-gray-100">Add Lost/Found Item</NavLink>
                                        <NavLink to="/all-recovered" className="block px-4 py-2 text-sm hover:bg-gray-100">All Recovered Items</NavLink>
                                        <NavLink to="/myItems" className="block px-4 py-2 text-sm hover:bg-gray-100">Manage My Items</NavLink>
                                    </div>
                                )}
                            </div>

                            <button onClick={handleLogout} className="btn btn-outline btn-primary">Logout</button>
                        </>
                    ) : (
                        <NavLink to="/login" className="btn btn-outline btn-primary">Login</NavLink>
                    )}
                </div>

                <div className="md:hidden flex items-center gap-3">
                    {user && (
                        <div
                            className="relative"
                            onClick={() => setShowDropdown(!showDropdown)}
                            onMouseEnter={() => setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                        >
                            <img
                                src={user.photoURL || "https://via.placeholder.com/40"}
                                alt={user.displayName || "User"}
                                className="w-10 h-10 rounded-full border cursor-pointer"
                            />
                            {showTooltip && (
                                <div className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs rounded px-2 py-1 z-10">
                                    {user.displayName || "User"}
                                </div>
                            )}

                            {showDropdown && (
                                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded w-48 z-50">
                                    <NavLink to="/addItems" className="block px-4 py-2 text-sm hover:bg-gray-100">Add Lost/Found Item</NavLink>
                                    <NavLink to="/all-recovered" className="block px-4 py-2 text-sm hover:bg-gray-100">All Recovered Items</NavLink>
                                    <NavLink to="/myItems" className="block px-4 py-2 text-sm hover:bg-gray-100">Manage My Items</NavLink>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Hamburger Menu */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="text-3xl text-blue-600"
                    >
                        <FiMenu />
                    </button>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="absolute right-4 top-16 bg-white rounded shadow-lg z-50 w-56 text-left py-2 md:hidden">
                        <NavLink
                            to="/"
                            className="block px-4 py-2 hover:bg-gray-100"
                            onClick={() => setMenuOpen(false)}
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/lost-found"
                            className="block px-4 py-2 hover:bg-gray-100"
                            onClick={() => setMenuOpen(false)}
                        >
                            Lost & Found
                        </NavLink>

                        {user ? (
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setMenuOpen(false);
                                }}
                                className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
                            >
                                Logout
                            </button>
                        ) : (
                            <NavLink
                                to="/login"
                                className="block px-4 py-2 hover:bg-gray-100"
                                onClick={() => setMenuOpen(false)}
                            >
                                Login
                            </NavLink>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
