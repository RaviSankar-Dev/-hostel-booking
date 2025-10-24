import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Utensils, Settings, AlertCircle, LogOut, Edit, Trash2 } from "lucide-react";
import Loader from "../components/Loader";

interface Complaint {
  category: string;
  message: string;
  reply?: string;
  resolved?: boolean;
  enabled?: boolean;
}

interface Student {
  email: string;
  name: string;
  city: string;
  guardian: string;
  aadhaar: string;
  room: string;
  bed?: string;
  password: string;
  payments?: { [month: string]: "Paid" | "Pending" };
}

interface FoodItem {
  breakfast: string;
  lunch: string;
  dinner: string;
}

function AdminDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<Student[]>([]);
  const [foodMenu, setFoodMenu] = useState<{ [day: string]: FoodItem }>({});
  const [facilities, setFacilities] = useState<string[]>([]);
  const [complaints, setComplaints] = useState<{ [email: string]: Complaint[] }>({});
  const [activeTab, setActiveTab] = useState<"students" | "food" | "facilities" | "complaints">("students");
  const [expandedStudent, setExpandedStudent] = useState<number | null>(null);
  const [newFacility, setNewFacility] = useState("");
  const [complaintEnabled, setComplaintEnabled] = useState<boolean>(true);
  const [editingFacility, setEditingFacility] = useState<number | null>(null);
  const [editFacilityText, setEditFacilityText] = useState("");

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const cleanFoodItem = (item: string): string => {
    if (!item || item.trim() === "" || item === "0" || item === "8" || item.length <= 1) {
      return "";
    }
    return item.trim();
  };

  useEffect(() => {
    setTimeout(() => {
      setStudents(JSON.parse(localStorage.getItem("students") || "[]"));

      const storedMenu = JSON.parse(localStorage.getItem("foodMenu") || "{}");
      if (Object.keys(storedMenu).length === 0) {
        const defaultMenu: { [day: string]: FoodItem } = {};
        days.forEach((d) => (defaultMenu[d] = { breakfast: "", lunch: "", dinner: "" }));
        setFoodMenu(defaultMenu);
      } else {
        // Clean up the stored menu automatically
        const cleanedMenu: { [day: string]: FoodItem } = {};
        days.forEach(day => {
          if (storedMenu[day]) {
            cleanedMenu[day] = {
              breakfast: cleanFoodItem(storedMenu[day].breakfast || ""),
              lunch: cleanFoodItem(storedMenu[day].lunch || ""),
              dinner: cleanFoodItem(storedMenu[day].dinner || "")
            };
          } else {
            cleanedMenu[day] = { breakfast: "", lunch: "", dinner: "" };
          }
        });
        setFoodMenu(cleanedMenu);
        // Update localStorage with cleaned data
        localStorage.setItem("foodMenu", JSON.stringify(cleanedMenu));
      }

      setFacilities(
        JSON.parse(
          localStorage.getItem("facilities") ||
            `["Wi-Fi","24/7 Water Supply","CCTV Security","Washing Machine"]`
        )
      );

      setComplaints(JSON.parse(localStorage.getItem("complaints") || "{}"));
      const enabled = JSON.parse(localStorage.getItem("complaintEnabled") || "true");
      setComplaintEnabled(enabled);
      setLoading(false);
    }, 500);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentAdmin");
    navigate("/admin-login");
  };

  const updateFoodItem = (day: string, meal: keyof FoodItem, value: string) => {
    const updatedMenu = {
      ...foodMenu,
      [day]: { ...foodMenu[day], [meal]: value },
    };
    setFoodMenu(updatedMenu);
    localStorage.setItem("foodMenu", JSON.stringify(updatedMenu));
  };

  const cleanupFoodMenu = () => {
    const cleanedMenu: { [day: string]: FoodItem } = {};
    
    // Only keep valid day entries and clean up unwanted values
    days.forEach(day => {
      if (foodMenu[day]) {
        const cleanedDay: FoodItem = {
          breakfast: cleanFoodItem(foodMenu[day].breakfast || ""),
          lunch: cleanFoodItem(foodMenu[day].lunch || ""),
          dinner: cleanFoodItem(foodMenu[day].dinner || "")
        };
        cleanedMenu[day] = cleanedDay;
      } else {
        // Initialize empty day if it doesn't exist
        cleanedMenu[day] = { breakfast: "", lunch: "", dinner: "" };
      }
    });
    
    setFoodMenu(cleanedMenu);
    localStorage.setItem("foodMenu", JSON.stringify(cleanedMenu));
    alert("Food menu cleaned! Removed unwanted entries (0, 8, and unnamed items).");
  };

  const addFacility = () => {
    if (!newFacility.trim()) return;
    const updatedFacilities = [...facilities, newFacility.trim()];
    setFacilities(updatedFacilities);
    localStorage.setItem("facilities", JSON.stringify(updatedFacilities));
    setNewFacility("");
  };

  const editFacility = (index: number) => {
    setEditingFacility(index);
    setEditFacilityText(facilities[index]);
  };

  const saveFacilityEdit = () => {
    if (!editFacilityText.trim()) return;
    const updatedFacilities = [...facilities];
    updatedFacilities[editingFacility!] = editFacilityText.trim();
    setFacilities(updatedFacilities);
    localStorage.setItem("facilities", JSON.stringify(updatedFacilities));
    setEditingFacility(null);
    setEditFacilityText("");
  };

  const cancelFacilityEdit = () => {
    setEditingFacility(null);
    setEditFacilityText("");
  };

  const deleteFacility = (index: number) => {
    if (window.confirm("Are you sure you want to delete this facility?")) {
      const updatedFacilities = facilities.filter((_, i) => i !== index);
      setFacilities(updatedFacilities);
      localStorage.setItem("facilities", JSON.stringify(updatedFacilities));
    }
  };

  const toggleComplaintEnabled = (checked: boolean) => {
    setComplaintEnabled(checked);
    localStorage.setItem("complaintEnabled", JSON.stringify(checked));
  };

  const totalComplaints = Object.values(complaints).reduce((sum, list) => sum + list.length, 0);
  const enabledComplaints = Object.values(complaints).reduce(
    (sum, list) => sum + list.filter((c) => c.enabled !== false).length,
    0
  );

  if (loading) return <Loader />;

  return (
    <div className="flex min-h-screen bg-white relative">
      {/* Sidebar */}
      <aside className="w-64 text-white p-6 hidden md:flex flex-col" style={{background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)'}}>
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col space-y-3">
          <button
            onClick={() => setActiveTab("students")}
            className={`flex items-center space-x-2 p-2 rounded ${
              activeTab === "students" ? "bg-blue-600" : "hover:bg-blue-500"
            }`}
          >
            <Users size={18} /> <span>Students</span>
          </button>
          <button
            onClick={() => setActiveTab("food")}
            className={`flex items-center space-x-2 p-2 rounded ${
              activeTab === "food" ? "bg-blue-600" : "hover:bg-blue-500"
            }`}
          >
            <Utensils size={18} /> <span>Food Menu</span>
          </button>
          <button
            onClick={() => setActiveTab("facilities")}
            className={`flex items-center space-x-2 p-2 rounded ${
              activeTab === "facilities" ? "bg-blue-600" : "hover:bg-blue-500"
            }`}
          >
            <Settings size={18} /> <span>Facilities</span>
          </button>
          <button
            onClick={() => setActiveTab("complaints")}
            className={`flex items-center space-x-2 p-2 rounded ${
              activeTab === "complaints" ? "bg-blue-600" : "hover:bg-blue-500"
            }`}
          >
            <AlertCircle size={18} /> <span>Complaints</span>
          </button>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-auto flex items-center space-x-2 px-3 py-2 rounded font-bold" style={{backgroundColor: '#dc2626'}} onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = '#b91c1c'} onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = '#dc2626'}
        >
          <LogOut size={18} /> <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6">
        <div className="rounded-2xl p-6 text-white shadow" style={{background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)'}}>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-sm mt-1" style={{color: '#dbeafe'}}>Manage students, food menu, facilities, and complaints</p>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="rounded-xl bg-white shadow-lg p-5 flex items-center justify-between" style={{border: '2px solid #2563eb'}}>
            <div>
              <p className="text-sm font-medium" style={{color: '#64748b'}}>Total Students</p>
              <p className="text-2xl font-bold" style={{color: '#1e293b'}}>{students.length}</p>
            </div>
            <div className="h-12 w-12 rounded-lg text-white flex items-center justify-center" style={{background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)'}}>
              <Users size={22} />
            </div>
          </div>
          <div className="rounded-xl bg-white shadow-lg p-5 flex items-center justify-between" style={{border: '2px solid #2563eb'}}>
            <div>
              <p className="text-sm font-medium" style={{color: '#64748b'}}>Complaints (Total)</p>
              <p className="text-2xl font-bold" style={{color: '#1e293b'}}>{totalComplaints}</p>
            </div>
            <div className="h-12 w-12 rounded-lg text-white flex items-center justify-center" style={{background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)'}}>
              <AlertCircle size={22} />
            </div>
          </div>
          <div className="rounded-xl bg-white shadow-lg p-5 flex items-center justify-between" style={{border: '2px solid #2563eb'}}>
            <div>
              <p className="text-sm font-medium" style={{color: '#64748b'}}>Complaints (Enabled)</p>
              <p className="text-2xl font-bold" style={{color: '#1e293b'}}>{enabledComplaints}</p>
            </div>
            <div className="h-12 w-12 rounded-lg text-white flex items-center justify-center" style={{background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)'}}>
              <AlertCircle size={22} />
            </div>
          </div>
        </section>

        {/* Students */}
        {activeTab === "students" && (
          <section className="bg-white p-5 rounded-xl shadow-lg" style={{border: '2px solid #2563eb'}}>
            <h2 className="text-2xl font-semibold mb-4" style={{color: '#1e293b'}}>Students</h2>
            {students.length === 0 ? (
              <p className="text-gray-500">No students added yet.</p>
            ) : (
              <ul className="space-y-3">
                {students.map((s, i) => (
                  <li
                    key={i}
                    className="border rounded-lg p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
                    onClick={() =>
                      setExpandedStudent(expandedStudent === i ? null : i)
                    }
                  >
                    <p className="font-semibold">{s.name}</p>
                    {expandedStudent === i && (
                      <div className="mt-3 space-y-2 text-sm text-gray-700">
                        <p>Email: {s.email}</p>
                        <p>Room: {s.room}</p>
                        <p>Bed: {s.bed}</p>
                        <p>Guardian: {s.guardian}</p>
                        <p>Aadhaar: {s.aadhaar}</p>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {/* Food Menu */}
        {activeTab === "food" && (
          <section className="bg-white p-6 rounded-xl shadow-lg" style={{border: '2px solid #2563eb'}}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold" style={{color: '#1e293b'}}>🍛 Weekly Food Menu</h2>
              <button
                onClick={cleanupFoodMenu}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition font-semibold"
              >
                🧹 Clean Menu
              </button>
            </div>
            <div className="space-y-4">
              {days.map((day) => (
                <div key={day} className="border rounded-lg p-4 bg-gray-50" style={{border: '1px solid #2563eb'}}>
                  <h3 className="font-semibold mb-3 text-lg" style={{color: '#1e293b'}}>{day}</h3>
                  {(["breakfast", "lunch", "dinner"] as (keyof FoodItem)[]).map(
                    (meal) => (
                      <div key={meal} className="flex items-center space-x-3 mb-3">
                        <span className="capitalize w-24 font-medium" style={{color: '#64748b'}}>{meal}:</span>
                        <input
                          type="text"
                          className="border p-2 rounded flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500" style={{borderColor: '#2563eb'}}
                          value={foodMenu[day]?.[meal] || ""}
                          onChange={(e) => updateFoodItem(day, meal, e.target.value)}
                          placeholder={`Add ${meal}`}
                        />
                      </div>
                    )
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Facilities */}
        {activeTab === "facilities" && (
          <section className="bg-white p-6 rounded-xl shadow-lg" style={{border: '2px solid #2563eb'}}>
            <h2 className="text-2xl font-semibold mb-4" style={{color: '#1e293b'}}>🏠 Facilities Management</h2>
            <div className="space-y-3">
              {facilities.map((facility, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg" style={{border: '1px solid #2563eb'}}>
                  {editingFacility === index ? (
                    <div className="flex items-center space-x-2 flex-1">
                      <span className="inline-block px-2 py-1 rounded-full text-xs bg-blue-600 text-white font-bold">{index + 1}</span>
                      <input
                        type="text"
                        value={editFacilityText}
                        onChange={(e) => setEditFacilityText(e.target.value)}
                        className="flex-1 border p-2 rounded" style={{borderColor: '#2563eb'}}
                        autoFocus
                      />
                      <button
                        onClick={saveFacilityEdit}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelFacilityEdit}
                        className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="inline-block px-2 py-1 rounded-full text-xs bg-blue-600 text-white font-bold">{index + 1}</span>
                        <span className="text-gray-800">{facility}</span>
                      </div>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => editFacility(index)}
                          className="p-1 text-blue-600 hover:bg-blue-100 rounded transition"
                          title="Edit facility"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => deleteFacility(index)}
                          className="p-1 text-red-600 hover:bg-red-100 rounded transition"
                          title="Delete facility"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex space-x-2 mt-4">
              <input
                type="text"
                placeholder="Add new facility"
                value={newFacility}
                onChange={(e) => setNewFacility(e.target.value)}
                className="border p-2 rounded flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500" style={{borderColor: '#2563eb'}}
                onKeyPress={(e) => e.key === 'Enter' && addFacility()}
              />
              <button
                onClick={addFacility}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                ➕ Add Facility
              </button>
            </div>
          </section>
        )}

        {/* Complaints */}
        {activeTab === "complaints" && (
          <section className="bg-white p-6 rounded-xl shadow-lg" style={{border: '2px solid #2563eb'}}>
            <h2 className="text-2xl font-semibold mb-4" style={{color: '#1e293b'}}>📝 Complaints Management</h2>

            {/* Global Toggle Card */}
            <div className="rounded-lg p-4 bg-gray-50" style={{border: '1px solid #2563eb'}}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold" style={{color: '#1e293b'}}>📝 Complaint Box Visibility</p>
                  <p className="text-sm" style={{color: '#64748b'}}>Control whether students can submit new complaints in their dashboard.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={!!complaintEnabled}
                    onChange={(e) => toggleComplaintEnabled(e.target.checked)}
                  />
                  <div className="w-14 h-8 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 transition-colors"></div>
                  <div className="absolute left-1 top-1 h-6 w-6 bg-white rounded-full shadow transition-transform peer-checked:translate-x-6" />
                </label>
              </div>
              <div className="mt-3 text-sm">
                {complaintEnabled ? (
                  <span className="inline-flex items-center gap-2 text-green-700 font-medium">
                    <span className="h-2 w-2 rounded-full bg-green-500"></span> Enabled for students
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 text-red-700 font-medium">
                    <span className="h-2 w-2 rounded-full bg-red-500"></span> Disabled for students
                  </span>
                )}
              </div>
            </div>
            <div className="mt-6">
              {Object.keys(complaints).length === 0 ? (
                <p className="text-gray-500 text-center py-8">No complaints submitted.</p>
              ) : (
                Object.entries(complaints).map(([email, list]) => (
                  <div key={email} className="border p-4 rounded-xl bg-gray-50 space-y-3 mb-4" style={{border: '1px solid #2563eb'}}>
                    <div className="flex items-center justify-between">
                      <p className="font-semibold" style={{color: '#1e293b'}}>{email}</p>
                      <span className="text-xs" style={{color: '#64748b'}}>{list.length} item(s)</span>
                    </div>
                    {list.map((c, i) => (
                      <div key={i} className="p-4 border rounded-lg bg-white space-y-2" style={{border: '1px solid #2563eb'}}>
                        {/* Complaint + Enable/Disable */}
                        <div className="flex justify-between items-start gap-4">
                          <div className="space-y-1">
                            <p className="text-sm" style={{color: '#64748b'}}>Category</p>
                            <p className="font-medium" style={{color: '#1e293b'}}><strong>{c.category}:</strong> {c.message}</p>
                            {c.resolved && (
                              <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">Resolved</span>
                            )}
                          </div>
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={c.enabled !== false}
                              onChange={(e) => {
                                const updatedComplaints = { ...complaints };
                                updatedComplaints[email] = updatedComplaints[email].map(
                                  (comp, idx) =>
                                    idx === i ? { ...comp, enabled: e.target.checked } : comp
                                );
                                setComplaints(updatedComplaints);
                                localStorage.setItem(
                                  "complaints",
                                  JSON.stringify(updatedComplaints)
                                );
                              }}
                              className="h-4 w-4 text-blue-600"
                            />
                            <span className="text-sm" style={{color: '#64748b'}}>
                              {c.enabled !== false ? "Enabled" : "Disabled"}
                            </span>
                          </label>
                        </div>

                        {/* Reply + Resolve */}
                        {c.reply ? (
                          <p className="text-green-600">✅ Reply: {c.reply}</p>
                        ) : (
                          <div className="flex space-x-2">
                            <input
                              type="text"
                              placeholder="Type reply..."
                              className="border p-2 rounded flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500" style={{borderColor: '#2563eb'}}
                              onChange={(e) => (c.reply = e.target.value)}
                            />
                            <button
                              onClick={() => {
                                if (!c.reply || c.reply.trim() === "") return;
                                const updatedComplaints = { ...complaints };
                                updatedComplaints[email][i] = {
                                  ...updatedComplaints[email][i],
                                  reply: c.reply,
                                  resolved: true,
                                };
                                setComplaints(updatedComplaints);
                                localStorage.setItem(
                                  "complaints",
                                  JSON.stringify(updatedComplaints)
                                );
                              }}
                              className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 font-semibold transition"
                            >
                              📝 Resolve
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ))
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
