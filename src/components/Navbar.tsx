import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const currentUser = localStorage.getItem("currentUser");
  const currentAdmin = localStorage.getItem("currentAdmin");
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    if (currentAdmin) localStorage.removeItem("currentAdmin");
    if (currentUser) localStorage.removeItem("currentUser");
    navigate("/");
    window.location.reload();
  };

  // Links for visitors (not logged in)
  const commonLinks = [
    { name: "Home", path: "/" },
    { name: "Rooms", path: "/rooms" },
    { name: "Facilities", path: "/facilities" },
    { name: "Food Menu", path: "/foodmenu" },
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1
          className="font-bold text-2xl tracking-wide cursor-pointer"
          onClick={() => navigate("/")}
        >
          Ravi PG
        </h1>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 items-center">
          {/* Show common links only when NOT logged in */}
          {!currentUser && !currentAdmin &&
            commonLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="hover:text-yellow-300 transition-colors duration-300 font-medium"
              >
                {link.name}
              </Link>
            ))}

          {currentUser && !currentAdmin && (
            <>
              <Link
                to="/dashboard"
                className="bg-white text-blue-600 px-4 py-1 rounded-md hover:bg-gray-200 transition font-medium"
              >
                Student Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-1 rounded-md hover:bg-red-600 transition font-medium"
              >
                Logout
              </button>
            </>
          )}

          {currentAdmin && (
            <>
              <Link
                to="/admin"
                className="bg-white text-blue-600 px-4 py-1 rounded-md hover:bg-gray-200 transition font-medium"
              >
                Admin Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-1 rounded-md hover:bg-red-600 transition font-medium"
              >
                Logout
              </button>
            </>
          )}

          {!currentUser && !currentAdmin && (
            <Link
              to="/auth"
              className="bg-white text-blue-600 px-4 py-1 rounded-md hover:bg-gray-200 transition font-medium"
            >
              Login / Register
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-700 px-6 py-4 space-y-4 flex flex-col">
          {!currentUser && !currentAdmin &&
            commonLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="hover:text-yellow-300 transition-colors duration-300 font-medium"
              >
                {link.name}
              </Link>
            ))}

          {currentUser && !currentAdmin && (
            <>
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="bg-white text-blue-600 px-4 py-1 rounded-md hover:bg-gray-200 transition font-medium"
              >
                Student Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-1 rounded-md hover:bg-red-600 transition font-medium"
              >
                Logout
              </button>
            </>
          )}

          {currentAdmin && (
            <>
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="bg-white text-blue-600 px-4 py-1 rounded-md hover:bg-gray-200 transition font-medium"
              >
                Admin Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-1 rounded-md hover:bg-red-600 transition font-medium"
              >
                Logout
              </button>
            </>
          )}

          {!currentUser && !currentAdmin && (
            <Link
              to="/auth"
              onClick={() => setIsOpen(false)}
              className="bg-white text-blue-600 px-4 py-1 rounded-md hover:bg-gray-200 transition font-medium"
            >
              Login / Register
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
