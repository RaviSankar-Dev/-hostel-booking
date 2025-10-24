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
    { name: "About Us", path: "/about" },
  ];

  return (
    <nav className="text-white sticky top-0 z-50 shadow-lg" style={{background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', borderBottom: '4px solid #2563eb'}}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1
          className="font-bold text-2xl tracking-wide cursor-pointer transition-colors"
          onClick={() => navigate("/")}
          onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#dbeafe'}
          onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'white'}
        >
          Gayatri Ladies Hostel
        </h1>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 items-center">
          {/* Show common links only when NOT logged in */}
          {!currentUser && !currentAdmin &&
            commonLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="transition-colors duration-300 font-medium px-3 py-1 rounded-lg"
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = '#dbeafe';
                  (e.target as HTMLElement).style.backgroundColor = 'rgba(219, 234, 254, 0.2)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = 'white';
                  (e.target as HTMLElement).style.backgroundColor = 'transparent';
                }}
              >
                {link.name === "Home" ? "🏠 Home" : 
                 link.name === "Rooms" ? "🏠 Rooms" :
                 link.name === "Facilities" ? "🏠 Facilities" :
                 link.name === "Food Menu" ? "🍛 Food Menu" :
                 link.name === "About Us" ? "👥 About Us" : link.name}
              </Link>
            ))}

          {currentUser && !currentAdmin && (
            <>
              <Link
                to="/dashboard"
                className="text-white px-4 py-2 rounded-lg transition font-bold"
                style={{backgroundColor: '#2563eb'}}
                onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = '#1d4ed8'}
                onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = '#2563eb'}
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
                className="text-white px-4 py-2 rounded-lg transition font-bold"
                style={{backgroundColor: '#2563eb'}}
                onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = '#1d4ed8'}
                onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = '#2563eb'}
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
        <div className="md:hidden px-6 py-4 space-y-4 flex flex-col" style={{background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)'}}>
          {!currentUser && !currentAdmin &&
            commonLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="transition-colors duration-300 font-medium px-3 py-1 rounded-lg"
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.color = '#dbeafe';
                  (e.target as HTMLElement).style.backgroundColor = 'rgba(219, 234, 254, 0.2)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.color = 'white';
                  (e.target as HTMLElement).style.backgroundColor = 'transparent';
                }}
              >
                {link.name === "Home" ? "🏠 Home" : 
                 link.name === "Rooms" ? "🏠 Rooms" :
                 link.name === "Facilities" ? "🏠 Facilities" :
                 link.name === "Food Menu" ? "🍛 Food Menu" :
                 link.name === "About Us" ? "👥 About Us" : link.name}
              </Link>
            ))}

          {currentUser && !currentAdmin && (
            <>
              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="text-white px-4 py-2 rounded-lg transition font-bold"
                style={{backgroundColor: '#2563eb'}}
                onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = '#1d4ed8'}
                onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = '#2563eb'}
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
                className="text-white px-4 py-2 rounded-lg transition font-bold"
                style={{backgroundColor: '#2563eb'}}
                onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = '#1d4ed8'}
                onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = '#2563eb'}
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
