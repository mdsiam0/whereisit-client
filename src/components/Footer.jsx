import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-4 md:px-20">
      <div className="max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
       
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">WhereIsIt</h3>
          <p className="text-gray-400 leading-relaxed">
            Your trusted platform for lost and found items. Helping you reconnect
            with your belongings effortlessly.
          </p>
        </div>

        
        <div>
          <h4 className="text-xl font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-white transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="/lost-found" className="hover:text-white transition-colors">
                Lost & Found
              </a>
            </li>
           
          </ul>
        </div>

       
        <div>
          <h4 className="text-xl font-semibold text-white mb-4">Contact Us</h4>
          <p>Email: support@whereisit.com</p>
          
          <p>Address: 123 Main St, Dhaka City</p>
        </div>

       
        <div>
          <h4 className="text-xl font-semibold text-white mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-white transition-colors"
            >
              <FaFacebookF size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-white transition-colors"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-white transition-colors"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-white transition-colors"
            >
              <FaLinkedinIn size={24} />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} WhereIsIt. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
