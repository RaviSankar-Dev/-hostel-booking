import { useEffect, useState } from "react";
import {
  AlertCircle,
  Send,
  CheckCircle2,
  MessageSquare,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface Student {
  email: string;
  name: string;
  city: string;
  guardian: string;
  aadhaar: string;
  room: string;
  bed?: string;
  password: string;
  profilePicture?: string;
  payments?: { [month: string]: "Paid" | "Pending" };
}

interface Complaint {
  category: string;
  message: string;
  reply?: string;
}

interface FoodItem {
  breakfast: string;
  lunch: string;
  dinner: string;
}

function Dashboard() {
  const [student, setStudent] = useState<Student | null>(null);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [newComplaint, setNewComplaint] = useState("");
  const [newCategory, setNewCategory] = useState("general");
  const [submitted, setSubmitted] = useState(false);
  const [complaintEnabled, setComplaintEnabled] = useState(true);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  // Accordion controls
  const [foodOpen, setFoodOpen] = useState(false);
  const [facilitiesOpen, setFacilitiesOpen] = useState(false);

  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

  const [foodMenu, setFoodMenu] = useState<{ [day: string]: FoodItem }>({});
  const [facilities, setFacilities] = useState<string[]>([]);

  // Load student, complaints, foodMenu, and facilities
  useEffect(() => {
    const email = localStorage.getItem("currentUser");
    const users: Student[] = JSON.parse(localStorage.getItem("students") || "[]");
    const current = users.find((u) => u.email === email) || null;
    setStudent(current);

    const savedComplaints = JSON.parse(localStorage.getItem("complaints") || "{}");
    if (email) setComplaints(savedComplaints[email] || []);

    const enabled = JSON.parse(localStorage.getItem("complaintEnabled") || "true");
    setComplaintEnabled(enabled);

    // Load profile picture
    if (current) {
      setProfilePicture(current.profilePicture || "");
    }

    // Load food menu
    const savedMenu = JSON.parse(localStorage.getItem("foodMenu") || "{}");
    if (Object.keys(savedMenu).length === 0) {
      const defaultMenu: { [day: string]: FoodItem } = {};
      days.forEach(d => defaultMenu[d] = { breakfast: "", lunch: "", dinner: "" });
      setFoodMenu(defaultMenu);
    } else setFoodMenu(savedMenu);

    // Load facilities
    setFacilities(JSON.parse(localStorage.getItem("facilities") || `["Wi-Fi","24/7 Water Supply","CCTV Security","Washing Machine"]`));
  }, []);

  const handleComplaintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!student || !newComplaint.trim()) return;

    const savedComplaints = JSON.parse(localStorage.getItem("complaints") || "{}");
    const userComplaints: Complaint[] = savedComplaints[student.email] || [];

    const complaintObj: Complaint = {
      category: newCategory,
      message: newComplaint
    };

    userComplaints.push(complaintObj);
    savedComplaints[student.email] = userComplaints;
    localStorage.setItem("complaints", JSON.stringify(savedComplaints));

    setComplaints(userComplaints);
    setNewComplaint("");
    setNewCategory("general");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleProfilePictureUpdate = () => {
    if (!student || (!profilePicture.trim() && !capturedImage)) return;

    const users: Student[] = JSON.parse(localStorage.getItem("students") || "[]");
    const userIndex = users.findIndex(u => u.email === student.email);
    
    if (userIndex !== -1) {
      users[userIndex].profilePicture = capturedImage || profilePicture;
      localStorage.setItem("students", JSON.stringify(users));
      setStudent(users[userIndex]);
      setShowProfileModal(false);
      setCapturedImage(null);
      setProfilePicture("");
      alert("Profile picture updated successfully!");
    }
  };


  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setCapturedImage(result);
        setProfilePicture(result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!student) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6 min-h-screen bg-white">
      
      <h1 className="text-3xl font-bold mb-6 text-center" style={{color: '#1e293b'}}>
        Welcome, {student.name}
      </h1>

      {/* Modern Profile Section */}
      <section className="mb-8 p-8 bg-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300" style={{border: '4px solid #2563eb'}}>
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Profile Picture */}
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden shadow-xl" style={{border: '4px solid #2563eb'}}>
              {student.profilePicture ? (
                <img 
                  src={student.profilePicture} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center" style={{background: 'linear-gradient(135deg, #F9A825 0%, #FFB74D 100%)'}}>
                  <span className="text-4xl text-white font-bold">{student.name.charAt(0)}</span>
                </div>
              )}
            </div>
            <button
              onClick={() => setShowProfileModal(true)}
              className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
              style={{backgroundColor: '#FF7043'}}
              onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = '#FF5722'}
              onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = '#FF7043'}
            >
              <span className="text-white text-lg">📷</span>
            </button>
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold mb-4" style={{color: '#2C3E50'}}>
              {student.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{color: '#2C3E50'}}>
              <div className="p-3 rounded-lg" style={{backgroundColor: '#F5F7FA', border: '2px solid #4CAF50'}}>
                <span className="font-bold">📧 Email:</span> {student.email}
              </div>
              <div className="p-3 rounded-lg" style={{backgroundColor: '#F5F7FA', border: '2px solid #4CAF50'}}>
                <span className="font-bold">🏙️ City/Village:</span> {student.city}
              </div>
              <div className="p-3 rounded-lg" style={{backgroundColor: '#F5F7FA', border: '2px solid #4CAF50'}}>
                <span className="font-bold">👨‍👩‍👧‍👦 Guardian:</span> {student.guardian}
              </div>
              <div className="p-3 rounded-lg" style={{backgroundColor: '#F5F7FA', border: '2px solid #4CAF50'}}>
                <span className="font-bold">🆔 Aadhaar:</span> {student.aadhaar}
              </div>
              <div className="p-3 rounded-lg" style={{backgroundColor: '#F5F7FA', border: '2px solid #4CAF50'}}>
                <span className="font-bold">🏠 Room:</span> {student.room}
              </div>
              <div className="p-3 rounded-lg" style={{backgroundColor: '#F5F7FA', border: '2px solid #4CAF50'}}>
                <span className="font-bold">🛏️ Bed:</span> {student.bed || "Not Assigned"}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Food Menu Accordion */}
      <section className="mb-6 bg-white rounded-xl shadow-lg" style={{border: '2px solid #F9A825'}}>
        <button
          onClick={() => setFoodOpen(!foodOpen)}
          className="w-full flex items-center justify-between p-6"
        >
          <h2 className="text-2xl font-semibold" style={{color: '#2C3E50'}}>Food Menu</h2>
          {foodOpen ? <ChevronUp style={{color: '#4CAF50'}} /> : <ChevronDown style={{color: '#4CAF50'}} />}
        </button>
        {foodOpen && (
          <div className="px-6 pb-6 space-y-3">
            {days.map(day => (
              <div key={day} className="border rounded p-3 bg-gray-50">
                <h3 className="font-semibold mb-2">{day}</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Breakfast:</strong> {foodMenu[day]?.breakfast || "-"}</li>
                  <li><strong>Lunch:</strong> {foodMenu[day]?.lunch || "-"}</li>
                  <li><strong>Dinner:</strong> {foodMenu[day]?.dinner || "-"}</li>
                </ul>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Facilities Accordion */}
      <section className="mb-6 bg-white rounded-xl shadow-lg" style={{border: '2px solid #F9A825'}}>
        <button
          onClick={() => setFacilitiesOpen(!facilitiesOpen)}
          className="w-full flex items-center justify-between p-6"
        >
          <h2 className="text-2xl font-semibold" style={{color: '#2C3E50'}}>Facilities</h2>
          {facilitiesOpen ? <ChevronUp style={{color: '#4CAF50'}} /> : <ChevronDown style={{color: '#4CAF50'}} />}
        </button>
        {facilitiesOpen && (
          <div className="px-6 pb-6">
            <ul className="list-disc pl-6 space-y-1">
              {facilities.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
          </div>
        )}
      </section>

      {/* Complaints Section */}
      <section className="mb-6 p-6 bg-white rounded-xl shadow-lg" style={{border: '2px solid #FF7043'}}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold" style={{color: '#2C3E50'}}>Complaints</h2>
          {!complaintEnabled && (
            <span className="text-red-600 font-medium bg-red-100 px-3 py-1 rounded-full">
              🚫 Complaint box disabled by Admin
            </span>
          )}
        </div>

        {complaintEnabled && (
          <form onSubmit={handleComplaintSubmit} className="mb-4 space-y-2">
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="general">General</option>
              <option value="food">Food Quality</option>
              <option value="cleaning">Cleaning & Hygiene</option>
              <option value="maintenance">Room Maintenance</option>
              <option value="wifi">Wi-Fi / Internet</option>
              <option value="other">Other</option>
            </select>
            <div className="relative">
              <textarea
                value={newComplaint}
                onChange={(e) => setNewComplaint(e.target.value)}
                placeholder="Write your complaint..."
                rows={3}
                className="w-full border p-2 rounded pr-10"
                required
              />
              <AlertCircle className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
            </div>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 w-full text-white py-2 rounded-lg font-bold"
              style={{backgroundColor: '#4CAF50'}}
              onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = '#45a049'}
              onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = '#4CAF50'}
            >
              <Send className="w-5 h-5" /> Submit Complaint
            </button>
          </form>
        )}

        {submitted && (
          <div className="flex items-center gap-2 text-green-600 font-semibold mt-2">
            <CheckCircle2 className="w-5 h-5" />
            Complaint submitted successfully!
          </div>
        )}

        <ul className="mt-4 space-y-3">
          {complaints.map((c, i) => (
            <li key={i} className="border rounded-lg p-3 bg-gray-50">
              <p>
                <strong>{c.category}:</strong> {c.message}
              </p>
              {c.reply ? (
                <p className="mt-1 text-green-700 flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" /> Reply: {c.reply}
                </p>
              ) : (
                <p className="mt-1 text-gray-500 italic">Awaiting reply...</p>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* Payment Status */}
      <section className="mb-6 p-6 bg-white rounded-xl shadow-lg" style={{border: '2px solid #4CAF50'}}>
        <h2 className="text-2xl font-semibold mb-4" style={{color: '#2C3E50'}}>Payment Status</h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {months.map((m) => {
            const status = student.payments?.[m] || "Pending";
            return (
              <li
                key={m}
                className={`p-2 rounded text-center ${
                  status === "Pending"
                    ? "bg-red-100 text-red-700 font-semibold"
                    : "bg-green-100 text-green-700 font-semibold"
                }`}
              >
                {m}: {status}
              </li>
            );
          })}
        </ul>
        <div className="text-center mt-6">
          <p className="text-lg font-bold" style={{color: '#FF7043'}}>Welcome to your new home!</p>
        </div>
      </section>

      {/* Profile Picture Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full mx-4 shadow-2xl border-4 border-yellow-300">
            <h3 className="text-2xl font-bold text-center mb-6 text-yellow-800">
              Update Profile Picture
            </h3>
            
            {/* Preview */}
            {(capturedImage || profilePicture) && (
              <div className="mb-6 text-center">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-yellow-400 shadow-lg">
                  <img 
                    src={capturedImage || profilePicture} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm text-gray-600 mt-2">Preview</p>
              </div>
            )}

            <div className="space-y-4">
              {/* Camera Capture */}
              <div className="text-center">
                <label className="block text-sm font-bold text-yellow-700 mb-3">
                  Take Photo or Upload Image:
                </label>
                <div className="flex flex-col gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="camera-input"
                  />
                  <label
                    htmlFor="camera-input"
                    className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-bold transition cursor-pointer flex items-center justify-center gap-2"
                  >
                    📷 Take Photo / Upload Image
                  </label>
                </div>
              </div>

              {/* Alternative URL Input */}
              <div>
                <label className="block text-sm font-bold text-yellow-700 mb-2">
                  Or Enter Image URL:
                </label>
                <input
                  type="url"
                  value={profilePicture}
                  onChange={(e) => setProfilePicture(e.target.value)}
                  placeholder="Enter image URL (optional)"
                  className="w-full p-3 border-2 border-yellow-300 rounded-lg focus:border-yellow-500 focus:outline-none"
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleProfilePictureUpdate}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-lg font-bold hover:from-green-600 hover:to-green-700 transition"
                >
                  💾 Save Picture
                </button>
                <button
                  onClick={() => {
                    setShowProfileModal(false);
                    setCapturedImage(null);
                    setProfilePicture("");
                  }}
                  className="flex-1 bg-gray-500 text-white py-3 px-4 rounded-lg font-bold hover:bg-gray-600 transition"
                >
                  ❌ Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
