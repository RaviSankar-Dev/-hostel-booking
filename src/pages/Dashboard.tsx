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

  if (!student) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Welcome, {student.name}</h1>

      {/* Profile Section */}
      <section className="mb-6 p-6 bg-white rounded-xl shadow space-y-2">
        <h2 className="text-2xl font-semibold mb-4">Profile</h2>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Full Name:</strong> {student.name}</p>
        <p><strong>City/Village:</strong> {student.city}</p>
        <p><strong>Guardian Number:</strong> {student.guardian}</p>
        <p><strong>Room:</strong> {student.room}</p>
        <p><strong>Bed:</strong> {student.bed || "Not Assigned"}</p>
        <p><strong>Aadhaar:</strong> {student.aadhaar}</p>
      </section>

      {/* Food Menu Accordion */}
      <section className="mb-6 bg-white rounded-xl shadow">
        <button
          onClick={() => setFoodOpen(!foodOpen)}
          className="w-full flex items-center justify-between p-6"
        >
          <h2 className="text-2xl font-semibold">Food Menu</h2>
          {foodOpen ? <ChevronUp /> : <ChevronDown />}
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
      <section className="mb-6 bg-white rounded-xl shadow">
        <button
          onClick={() => setFacilitiesOpen(!facilitiesOpen)}
          className="w-full flex items-center justify-between p-6"
        >
          <h2 className="text-2xl font-semibold">Facilities</h2>
          {facilitiesOpen ? <ChevronUp /> : <ChevronDown />}
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
      <section className="mb-6 p-6 bg-white rounded-xl shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Complaints</h2>
          {!complaintEnabled && (
            <span className="text-red-600 font-medium">
              Complaint box disabled by Admin
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
              className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-2 rounded-lg"
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
      <section className="mb-6 p-6 bg-white rounded-xl shadow">
        <h2 className="text-2xl font-semibold mb-4">Payment Status</h2>
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
      </section>
    </div>
  );
}

export default Dashboard;
