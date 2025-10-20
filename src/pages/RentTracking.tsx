import { useEffect, useState } from "react";

interface Student {
  name: string;
  email: string;
  room: string;
  bed?: string;
  payments?: { [month: string]: "Paid" | "Pending" };
}

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function RentTracking() {
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const users: Student[] = JSON.parse(localStorage.getItem("students") || "[]");
    setStudents(users);
  }, []);

  const handlePaymentChange = (index: number, month: string, value: "Paid" | "Pending") => {
    const updatedStudents = [...students];
    if (!updatedStudents[index].payments) updatedStudents[index].payments = {};
    updatedStudents[index].payments![month] = value;
    setStudents(updatedStudents);
    localStorage.setItem("students", JSON.stringify(updatedStudents));
  };

  const sendReminder = (student: Student, month: string) => {
    alert(`📩 Reminder sent to ${student.name} (${student.email}) for ${month} payment!`);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-extrabold text-gray-800 tracking-wide">
        🏠 Rent Tracking Dashboard
      </h1>

      {/* Search Bar */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow">
        <input
          type="text"
          placeholder="Search student by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Student Cards */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {students
          .filter((s) => s.name.toLowerCase().includes(search.toLowerCase()))
          .map((student, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-lg p-5 flex flex-col space-y-4 hover:shadow-xl transition"
            >
              {/* Student Info */}
              <div>
                <h2 className="text-xl font-bold text-blue-600">{student.name}</h2>
                <p className="text-gray-600 text-sm">{student.email}</p>
                <p className="text-gray-700 mt-1 text-sm">
                  Room: <span className="font-semibold">{student.room}</span>
                  {student.bed && ` | Bed: ${student.bed}`}
                </p>
              </div>

              {/* Monthly Payments */}
              <div className="space-y-2">
                {months.map((m) => (
                  <div
                    key={m}
                    className="flex justify-between items-center bg-gray-50 p-2 rounded-lg"
                  >
                    <span className="text-sm font-medium">{m}</span>
                    <div className="flex items-center gap-2">
                      <select
                        value={student.payments?.[m] || "Pending"}
                        onChange={(e) =>
                          handlePaymentChange(i, m, e.target.value as "Paid" | "Pending")
                        }
                        className={`px-2 py-1 rounded text-sm font-medium ${
                          student.payments?.[m] === "Paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        <option>Paid</option>
                        <option>Pending</option>
                      </select>
                      {student.payments?.[m] === "Pending" && (
                        <button
                          onClick={() => sendReminder(student, m)}
                          className="bg-yellow-500 text-white px-2 py-1 rounded-lg text-xs hover:bg-yellow-600 transition"
                        >
                          Reminder
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default RentTracking;
