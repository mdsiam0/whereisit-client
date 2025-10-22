import { useEffect } from "react";
import { Link } from "react-router";

const NotFound = () => {
  useEffect(() => {
    document.title = "404 Page";
  }, []);
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center">
      <h1 className="text-5xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-500 mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link to="/" className="btn btn-primary">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
