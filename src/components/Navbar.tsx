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
    <nav className="bg-gradient-to-r from-orange-600 via-yellow-500 to-red-600 text-white sticky top-0 z-50 shadow-lg border-b-4 border-yellow-400">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1
          className="font-bold text-2xl tracking-wide cursor-pointer hover:text-yellow-200 transition-colors"
          onClick={() => navigate("/")}
        >
          🏠 Gayatri Ladies Hostel 🪔
        </h1>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 items-center">
          {/* Show common links only when NOT logged in */}
          {!currentUser && !currentAdmin &&
            commonLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="hover:text-yellow-200 transition-colors duration-300 font-medium hover:bg-yellow-500/20 px-3 py-1 rounded-lg"
              >
                {link.name === "Home" ? "🏠 Home" : 
                 link.name === "Rooms" ? "🏠 Rooms" :
                 link.name === "Facilities" ? "🏠 Facilities" :
                 link.name === "Food Menu" ? "🍛 Food Menu" : link.name}
              </Link>
            ))}

          {currentUser && !currentAdmin && (
            <>
              <Link
                to="/dashboard"
                className="bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 px-4 py-2 rounded-lg hover:from-yellow-200 hover:to-orange-200 transition font-bold border-2 border-yellow-400"
              >
                📊 Student Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-500 to-red-600 px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition font-bold"
              >
                🚪 Logout
              </button>
            </>
          )}

          {currentAdmin && (
            <>
              <Link
                to="/admin"
                className="bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 px-4 py-2 rounded-lg hover:from-yellow-200 hover:to-orange-200 transition font-bold border-2 border-yellow-400"
              >
                🎆 Admin Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-500 to-red-600 px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition font-bold"
              >
                🚪 Logout
              </button>
            </>
          )}

          {!currentUser && !currentAdmin && (
            <Link
              to="/auth"
              className="bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 px-4 py-2 rounded-lg hover:from-yellow-200 hover:to-orange-200 transition font-bold border-2 border-yellow-400"
            >
              🔑 Login / Register
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
        <div className="md:hidden bg-gradient-to-r from-orange-700 via-yellow-600 to-red-700 px-6 py-4 space-y-4 flex flex-col">
          {!currentUser && !currentAdmin &&
            commonLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="hover:text-yellow-200 transition-colors duration-300 font-medium hover:bg-yellow-500/20 px-3 py-1 rounded-lg"
              >
                {link.name === "Home" ? "🏠 Home" : 
                 link.name === "Rooms" ? "🏠 Rooms" :
                 link.name === "Facilities" ? "🏠 Facilities" :
                 link.name === "Food Menu" ? "🍛 Food Menu" : link.name}
              </Link>
            ))}

          {currentUser && !currentAdmin && (
            <>
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 px-4 py-2 rounded-lg hover:from-yellow-200 hover:to-orange-200 transition font-bold border-2 border-yellow-400"
              >
                📊 Student Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-500 to-red-600 px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition font-bold"
              >
                🚪 Logout
              </button>
            </>
          )}

          {currentAdmin && (
            <>
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 px-4 py-2 rounded-lg hover:from-yellow-200 hover:to-orange-200 transition font-bold border-2 border-yellow-400"
              >
                🎆 Admin Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-500 to-red-600 px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition font-bold"
              >
                🚪 Logout
              </button>
            </>
          )}

          {!currentUser && !currentAdmin && (
            <Link
              to="/auth"
              onClick={() => setIsOpen(false)}
              className="bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 px-4 py-2 rounded-lg hover:from-yellow-200 hover:to-orange-200 transition font-bold border-2 border-yellow-400"
            >
              🔑 Login / Register
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
