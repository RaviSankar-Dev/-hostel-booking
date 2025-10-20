import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Utensils, Settings, AlertCircle, LogOut } from "lucide-react";
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

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  useEffect(() => {
    setTimeout(() => {
      setStudents(JSON.parse(localStorage.getItem("students") || "[]"));

      const storedMenu = JSON.parse(localStorage.getItem("foodMenu") || "{}");
      if (Object.keys(storedMenu).length === 0) {
        const defaultMenu: { [day: string]: FoodItem } = {};
        days.forEach((d) => (defaultMenu[d] = { breakfast: "", lunch: "", dinner: "" }));
        setFoodMenu(defaultMenu);
      } else setFoodMenu(storedMenu);

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

  const addFacility = () => {
    if (!newFacility.trim()) return;
    const updatedFacilities = [...facilities, newFacility.trim()];
    setFacilities(updatedFacilities);
    localStorage.setItem("facilities", JSON.stringify(updatedFacilities));
    setNewFacility("");
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
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-indigo-700 to-purple-700 text-white p-6 hidden md:flex flex-col">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="flex flex-col space-y-3">
          <button
            onClick={() => setActiveTab("students")}
            className={`flex items-center space-x-2 p-2 rounded ${
              activeTab === "students" ? "bg-indigo-600" : "hover:bg-indigo-500"
            }`}
          >
            <Users size={18} /> <span>Students</span>
          </button>
          <button
            onClick={() => setActiveTab("food")}
            className={`flex items-center space-x-2 p-2 rounded ${
              activeTab === "food" ? "bg-indigo-600" : "hover:bg-indigo-500"
            }`}
          >
            <Utensils size={18} /> <span>Food Menu</span>
          </button>
          <button
            onClick={() => setActiveTab("facilities")}
            className={`flex items-center space-x-2 p-2 rounded ${
              activeTab === "facilities" ? "bg-indigo-600" : "hover:bg-indigo-500"
            }`}
          >
            <Settings size={18} /> <span>Facilities</span>
          </button>
          <button
            onClick={() => setActiveTab("complaints")}
            className={`flex items-center space-x-2 p-2 rounded ${
              activeTab === "complaints" ? "bg-indigo-600" : "hover:bg-indigo-500"
            }`}
          >
            <AlertCircle size={18} /> <span>Complaints</span>
          </button>
        </nav>
        <button
          onClick={handleLogout}
          className="mt-auto flex items-center space-x-2 bg-red-500 px-3 py-2 rounded hover:bg-red-600"
        >
          <LogOut size={18} /> <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6">
        <div className="rounded-2xl p-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-indigo-100 mt-1">Manage students, food menu, facilities, and complaints</p>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="rounded-xl bg-white shadow p-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Students</p>
              <p className="text-2xl font-semibold text-gray-800">{students.length}</p>
            </div>
            <div className="h-12 w-12 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <Users size={22} />
            </div>
          </div>
          <div className="rounded-xl bg-white shadow p-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Complaints (Total)</p>
              <p className="text-2xl font-semibold text-gray-800">{totalComplaints}</p>
            </div>
            <div className="h-12 w-12 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center">
              <AlertCircle size={22} />
            </div>
          </div>
          <div className="rounded-xl bg-white shadow p-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Complaints (Enabled)</p>
              <p className="text-2xl font-semibold text-gray-800">{enabledComplaints}</p>
            </div>
            <div className="h-12 w-12 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <AlertCircle size={22} />
            </div>
          </div>
        </section>

        {/* Students */}
        {activeTab === "students" && (
          <section className="bg-white p-5 rounded-xl shadow">
            <h2 className="text-2xl font-semibold mb-4">Students</h2>
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
          <section className="bg-white p-5 rounded-xl shadow space-y-4">
            <h2 className="text-2xl font-semibold mb-2">Weekly Food Menu</h2>
            {days.map((day) => (
              <div key={day} className="border rounded p-3 bg-gray-50">
                <h3 className="font-semibold mb-2">{day}</h3>
                {(["breakfast", "lunch", "dinner"] as (keyof FoodItem)[]).map(
                  (meal) => (
                    <div key={meal} className="flex items-center space-x-2 mb-2">
                      <span className="capitalize w-24">{meal}:</span>
                      <input
                        type="text"
                        className="border p-2 rounded flex-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={foodMenu[day]?.[meal] || ""}
                        onChange={(e) => updateFoodItem(day, meal, e.target.value)}
                        placeholder={`Add ${meal}`}
                      />
                    </div>
                  )
                )}
              </div>
            ))}
          </section>
        )}

        {/* Facilities */}
        {activeTab === "facilities" && (
          <section className="bg-white p-5 rounded-xl shadow space-y-3">
            <h2 className="text-2xl font-semibold mb-2">Facilities</h2>
            <ul className="list-disc pl-6 space-y-1">
              {facilities.map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-indigo-100 text-indigo-700">{i + 1}</span>
                  {f}
                </li>
              ))}
            </ul>
            <div className="flex space-x-2 mt-2">
              <input
                type="text"
                placeholder="Add new facility"
                value={newFacility}
                onChange={(e) => setNewFacility(e.target.value)}
                className="border p-2 rounded flex-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={addFacility}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Add
              </button>
            </div>
          </section>
        )}

        {/* Complaints */}
        {activeTab === "complaints" && (
          <section className="bg-white p-5 rounded-xl shadow space-y-4">
            <h2 className="text-2xl font-semibold">Complaints</h2>

            {/* Global Toggle Card */}
            <div className="rounded-lg border p-4 bg-gradient-to-r from-indigo-50 to-purple-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-800">Complaint Box Visibility</p>
                  <p className="text-sm text-gray-600">Control whether students can submit new complaints in their dashboard.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer select-none">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={!!complaintEnabled}
                    onChange={(e) => toggleComplaintEnabled(e.target.checked)}
                  />
                  <div className="w-14 h-8 bg-gray-300 rounded-full peer peer-checked:bg-indigo-600 transition-colors"></div>
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
            {Object.keys(complaints).length === 0 ? (
              <p className="text-gray-500">No complaints submitted.</p>
            ) : (
              Object.entries(complaints).map(([email, list]) => (
                <div key={email} className="border p-4 rounded-xl bg-gray-50 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold">{email}</p>
                    <span className="text-xs text-gray-500">{list.length} item(s)</span>
                  </div>
                  {list.map((c, i) => (
                    <div key={i} className="p-4 border rounded-lg bg-white space-y-2">
                      {/* Complaint + Enable/Disable */}
                      <div className="flex justify-between items-start gap-4">
                        <div className="space-y-1">
                          <p className="text-sm text-gray-500">Category</p>
                          <p className="font-medium"><strong>{c.category}:</strong> {c.message}</p>
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
                            className="h-4 w-4 text-indigo-600"
                          />
                          <span className="text-sm">
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
                            className="border p-2 rounded flex-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                            className="bg-indigo-600 text-white px-3 py-2 rounded-lg hover:bg-indigo-700"
                          >
                            Resolve
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))
            )}
          </section>
        )}
      </main>
    </div>
  );
}

export default AdminDashboard;
