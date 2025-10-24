import { useEffect, useState } from "react";
import { Bell, Send, Clock, CheckCircle, AlertCircle, Users } from "lucide-react";

interface Student {
  name: string;
  email: string;
  room: string;
  bed?: string;
  payments?: { [month: string]: "Paid" | "Pending" };
}

interface Reminder {
  id: string;
  studentName: string;
  studentEmail: string;
  month: string;
  sentDate: string;
  status: "sent" | "delivered" | "failed";
  message: string;
}

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function RentTracking() {
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [showReminderHistory, setShowReminderHistory] = useState(false);
  const [bulkReminderMonth, setBulkReminderMonth] = useState("");
  const [showBulkReminder, setShowBulkReminder] = useState(false);

  useEffect(() => {
    const users: Student[] = JSON.parse(localStorage.getItem("students") || "[]");
    setStudents(users);
    
    // Load reminder history
    const savedReminders = JSON.parse(localStorage.getItem("reminders") || "[]");
    setReminders(savedReminders);
  }, []);

  const handlePaymentChange = (index: number, month: string, value: "Paid" | "Pending") => {
    const updatedStudents = [...students];
    if (!updatedStudents[index].payments) updatedStudents[index].payments = {};
    updatedStudents[index].payments![month] = value;
    setStudents(updatedStudents);
    localStorage.setItem("students", JSON.stringify(updatedStudents));
  };

  const sendReminder = (student: Student, month: string) => {
    const reminderId = Date.now().toString();
    const newReminder: Reminder = {
      id: reminderId,
      studentName: student.name,
      studentEmail: student.email,
      month: month,
      sentDate: new Date().toLocaleString(),
      status: "sent",
      message: `Payment reminder for ${month} - Amount: ₹5,000`
    };
    
    const updatedReminders = [...reminders, newReminder];
    setReminders(updatedReminders);
    localStorage.setItem("reminders", JSON.stringify(updatedReminders));
    
    alert(`📩 Reminder sent to ${student.name} (${student.email}) for ${month} payment!`);
  };

  const sendBulkReminders = () => {
    if (!bulkReminderMonth) {
      alert("Please select a month for bulk reminders");
      return;
    }

    const pendingStudents = students.filter(student => 
      student.payments?.[bulkReminderMonth] === "Pending"
    );

    if (pendingStudents.length === 0) {
      alert("No pending payments found for the selected month");
      return;
    }

    const newReminders: Reminder[] = pendingStudents.map(student => ({
      id: Date.now().toString() + Math.random(),
      studentName: student.name,
      studentEmail: student.email,
      month: bulkReminderMonth,
      sentDate: new Date().toLocaleString(),
      status: "sent",
      message: `Bulk payment reminder for ${bulkReminderMonth} - Amount: ₹5,000`
    }));

    const updatedReminders = [...reminders, ...newReminders];
    setReminders(updatedReminders);
    localStorage.setItem("reminders", JSON.stringify(updatedReminders));

    alert(`📩 Bulk reminders sent to ${pendingStudents.length} students for ${bulkReminderMonth} payment!`);
    setShowBulkReminder(false);
    setBulkReminderMonth("");
  };

  const getPendingCount = () => {
    return students.reduce((count, student) => {
      return count + Object.values(student.payments || {}).filter(status => status === "Pending").length;
    }, 0);
  };

  const getPaidCount = () => {
    return students.reduce((count, student) => {
      return count + Object.values(student.payments || {}).filter(status => status === "Paid").length;
    }, 0);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6 bg-white min-h-screen">
      <h1 className="text-3xl font-extrabold tracking-wide" style={{color: '#1e293b'}}>
        Rent Tracking Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-lg" style={{border: '2px solid #2563eb'}}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium" style={{color: '#64748b'}}>Total Students</p>
              <p className="text-2xl font-bold" style={{color: '#1e293b'}}>{students.length}</p>
            </div>
            <Users className="w-8 h-8" style={{color: '#2563eb'}} />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-lg" style={{border: '2px solid #2563eb'}}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium" style={{color: '#64748b'}}>Pending Payments</p>
              <p className="text-2xl font-bold" style={{color: '#dc2626'}}>{getPendingCount()}</p>
            </div>
            <AlertCircle className="w-8 h-8" style={{color: '#dc2626'}} />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-lg" style={{border: '2px solid #2563eb'}}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium" style={{color: '#64748b'}}>Paid Payments</p>
              <p className="text-2xl font-bold" style={{color: '#16a34a'}}>{getPaidCount()}</p>
            </div>
            <CheckCircle className="w-8 h-8" style={{color: '#16a34a'}} />
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-lg" style={{border: '2px solid #2563eb'}}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium" style={{color: '#64748b'}}>Reminders Sent</p>
              <p className="text-2xl font-bold" style={{color: '#2563eb'}}>{reminders.length}</p>
            </div>
            <Bell className="w-8 h-8" style={{color: '#2563eb'}} />
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-xl shadow gap-4" style={{border: '2px solid #2563eb'}}>
        <input
          type="text"
          placeholder="Search student by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 border rounded-lg px-4 py-2 focus:ring-2 outline-none" style={{borderColor: '#2563eb'}}
        />
        
        <div className="flex gap-2">
          <button
            onClick={() => setShowBulkReminder(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition"
            style={{backgroundColor: '#2563eb'}}
            onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = '#1d4ed8'}
            onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = '#2563eb'}
          >
            <Send className="w-4 h-4" />
            Bulk Reminders
          </button>
          
          <button
            onClick={() => setShowReminderHistory(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition"
            style={{backgroundColor: '#f8fafc', color: '#2563eb', border: '2px solid #2563eb'}}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.backgroundColor = '#dbeafe';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.backgroundColor = '#f8fafc';
            }}
          >
            <Clock className="w-4 h-4" />
            Reminder History
          </button>
        </div>
      </div>

      {/* Student Cards */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {students
          .filter((s) => s.name.toLowerCase().includes(search.toLowerCase()))
          .map((student, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-lg p-5 flex flex-col space-y-4 hover:shadow-xl transition" style={{border: '2px solid #2563eb'}}
            >
              {/* Student Info */}
              <div>
                <h2 className="text-xl font-bold" style={{color: '#2563eb'}}>{student.name}</h2>
                <p className="text-sm" style={{color: '#64748b'}}>{student.email}</p>
                <p className="mt-1 text-sm" style={{color: '#1e293b'}}>
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

      {/* Bulk Reminder Modal */}
      {showBulkReminder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4" style={{border: '4px solid #2563eb'}}>
            <h3 className="text-xl font-bold mb-4" style={{color: '#1e293b'}}>Send Bulk Reminders</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{color: '#64748b'}}>Select Month</label>
                <select
                  value={bulkReminderMonth}
                  onChange={(e) => setBulkReminderMonth(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2" style={{borderColor: '#2563eb'}}
                >
                  <option value="">Choose a month</option>
                  {months.map(month => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={sendBulkReminders}
                  className="flex-1 px-4 py-2 rounded-lg text-white font-medium transition"
                  style={{backgroundColor: '#2563eb'}}
                  onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = '#1d4ed8'}
                  onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = '#2563eb'}
                >
                  Send Reminders
                </button>
                <button
                  onClick={() => setShowBulkReminder(false)}
                  className="flex-1 px-4 py-2 rounded-lg font-medium transition"
                  style={{backgroundColor: '#f8fafc', color: '#64748b', border: '2px solid #64748b'}}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reminder History Modal */}
      {showReminderHistory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-4xl mx-4 max-h-[80vh] overflow-y-auto" style={{border: '4px solid #2563eb'}}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold" style={{color: '#1e293b'}}>Reminder History</h3>
              <button
                onClick={() => setShowReminderHistory(false)}
                className="text-2xl font-bold" style={{color: '#64748b'}}
              >
                ×
              </button>
            </div>
            <div className="space-y-3">
              {reminders.length === 0 ? (
                <p className="text-center py-8" style={{color: '#64748b'}}>No reminders sent yet</p>
              ) : (
                reminders.map((reminder) => (
                  <div key={reminder.id} className="bg-gray-50 p-4 rounded-lg" style={{border: '2px solid #2563eb'}}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold" style={{color: '#1e293b'}}>{reminder.studentName}</h4>
                        <p className="text-sm" style={{color: '#64748b'}}>{reminder.studentEmail}</p>
                        <p className="text-sm font-medium" style={{color: '#2563eb'}}>{reminder.month} - {reminder.message}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs" style={{color: '#64748b'}}>{reminder.sentDate}</p>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          reminder.status === 'sent' ? 'bg-blue-100 text-blue-700' :
                          reminder.status === 'delivered' ? 'bg-green-100 text-green-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {reminder.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RentTracking;
