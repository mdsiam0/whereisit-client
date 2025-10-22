import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/logo.png";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleLogout = () => {
    logout().then(() => {});
  };

 
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  
  const navLinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `font-semibold text-sm md:text-base block ${
            isActive ? "text-blue-600" : "text-gray-800"
          }`
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/allItems"
        className={({ isActive }) =>
          `font-semibold text-sm md:text-base block ${
            isActive ? "text-blue-600" : "text-gray-800"
          }`
        }
      >
        Lost & Found
      </NavLink>

   
      <NavLink
        to="/notice"
        className={({ isActive }) =>
          `font-semibold text-sm md:text-base block ${
            isActive ? "text-blue-600" : "text-gray-800"
          }`
        }
      >
        Notice
      </NavLink>

      {user && (
        <>
          <NavLink
            to="/addItems"
            className={({ isActive }) =>
              `font-semibold text-sm md:text-base block ${
                isActive ? "text-blue-600" : "text-gray-800"
              }`
            }
          >
            Add Item
          </NavLink>

          <NavLink
            to="/all-recovered"
            className={({ isActive }) =>
              `font-semibold text-sm md:text-base block ${
                isActive ? "text-blue-600" : "text-gray-800"
              }`
            }
          >
            All Recovered
          </NavLink>

          <NavLink
            to="/myItems"
            className={({ isActive }) =>
              `font-semibold text-sm md:text-base block ${
                isActive ? "text-blue-600" : "text-gray-800"
              }`
            }
          >
            My Items
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/60 backdrop-blur-md shadow-md"
          : "bg-white shadow-md"
      }`}
    >
      <div className="flex justify-between items-center max-w-[1500px] mx-auto px-4 py-4 md:px-6">
    
        <NavLink
          to="/"
          className="text-xl font-bold text-blue-600 flex items-center gap-2"
        >
          <img className="w-10 h-10" src={logo} alt="Logo" />
          <h2 className="text-2xl md:text-3xl">WhereIsIt</h2>
        </NavLink>

        
        <div className="hidden md:flex items-center gap-2 lg:gap-4 text-base">
          {navLinks}

         
          {user && (
            <div
              className="relative"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <img
                src={user.photoURL || "https://via.placeholder.com/40"}
                alt={user.displayName || "User"}
                className="w-10 h-10 rounded-full border cursor-pointer"
              />
              {showTooltip && (
                <div className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs rounded px-2 py-1 z-10 whitespace-nowrap">
                  {user.displayName || "User"}
                </div>
              )}
            </div>
          )}

         
          {user ? (
            <button
              onClick={handleLogout}
              className="btn btn-outline btn-primary ml-2"
            >
              Logout
            </button>
          ) : (
            <NavLink to="/login" className="btn btn-outline btn-primary ml-2">
              Login
            </NavLink>
          )}
        </div>

       
        <div className="md:hidden flex items-center gap-3">
          {user && (
            <div
              className="relative"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <img
                src={user.photoURL || "https://via.placeholder.com/40"}
                alt={user.displayName || "User"}
                className="w-10 h-10 rounded-full border cursor-pointer"
              />
              {showTooltip && (
                <div className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs rounded px-2 py-1 z-10 whitespace-nowrap">
                  {user.displayName || "User"}
                </div>
              )}
            </div>
          )}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-3xl text-blue-600"
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

    
      {menuOpen && (
        <div className="absolute right-4 top-16 bg-white/90 backdrop-blur-lg rounded shadow-lg z-50 w-56 p-4 md:hidden flex flex-col space-y-2">
          {navLinks}
          <div className="border-t border-gray-200 my-2"></div>
          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="block w-full text-left py-2 hover:bg-red-100 text-red-600 font-medium"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className="block py-2 hover:bg-gray-100 font-medium"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
