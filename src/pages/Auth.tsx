import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Student {
  email: string;
  password: string;
  name: string;
  city: string;
  guardian: string;
  aadhaar: string;
  room: string;
  bed: string;
  payments?: { [month: string]: "Paid" | "Pending" };
}

function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [students, setStudents] = useState<Student[]>([]);
  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    city: "",
    guardian: "",
    aadhaar: "",
    room: "",
    bed: "",
  });
  const [showForgot, setShowForgot] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetPassword, setResetPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("students") || "[]");
    setStudents(saved);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Debug: Log the form data
    console.log("Form data:", form);
    console.log("Aadhaar length:", form.aadhaar.length);
    console.log("Aadhaar value:", form.aadhaar);

    if (isLogin) {
      // Login
      const user = students.find(s => s.email === form.email && s.password === form.password);
      if (!user) return alert("Invalid credentials");
      localStorage.setItem("currentUser", user.email);
      navigate("/dashboard");
    } else {
      // Register
      if (!/^\d{12}$/.test(form.aadhaar)) {
        return alert(`Please enter a valid 12-digit Aadhaar number. You entered: "${form.aadhaar}" (${form.aadhaar.length} digits)`);
      }
      if (students.find(s => s.email === form.email)) return alert("Email already exists");
      
      // Validate room and bed selection
      if (!form.room.trim()) return alert("Please select a room number");
      if (!form.bed.trim()) return alert("Please select a bed number");
      
      // Check if room and bed combination is already taken
      const existingStudent = students.find(s => s.room === form.room && s.bed === form.bed);
      if (existingStudent) {
        return alert(`Room ${form.room} Bed ${form.bed} is already occupied. Please choose a different room/bed combination.`);
      }

      const newStudent: Student = {
        email: form.email,
        password: form.password,
        name: form.name,
        city: form.city,
        guardian: form.guardian,
        aadhaar: form.aadhaar,
        room: form.room,
        bed: form.bed,
        payments: {},
      };

      const updatedStudents = [...students, newStudent];
      setStudents(updatedStudents);
      localStorage.setItem("students", JSON.stringify(updatedStudents));
      localStorage.setItem("currentUser", newStudent.email);
      navigate("/dashboard");
    }
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) return alert("Please enter your email");
    const userIndex = students.findIndex((s) => s.email === resetEmail);
    if (userIndex === -1) return alert("Email not found");
    
    // Generate 6-digit OTP
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    setOtpSent(true);
    alert(`OTP sent to ${resetEmail}. OTP: ${newOtp} (This is simulated - in real app, send via email)`);
  };

  const handleOtpVerification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || !resetPassword) return alert("Please fill all fields");
    if (otp !== generatedOtp) return alert("Invalid OTP");
    
    const userIndex = students.findIndex((s) => s.email === resetEmail);
    const updated = [...students];
    updated[userIndex] = { ...updated[userIndex], password: resetPassword };
    setStudents(updated);
    localStorage.setItem("students", JSON.stringify(updated));
    alert("Password reset successful. Please login with your new password.");
    setShowForgot(false);
    setIsLogin(true);
    setResetEmail("");
    setResetPassword("");
    setOtpSent(false);
    setOtp("");
    setGeneratedOtp("");
  };


  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative">

      

      <div className="max-w-md w-full p-6 bg-white rounded-xl shadow-lg" style={{border: '2px solid #2563eb'}}>
        <h1 className="text-2xl font-bold mb-4 text-center" style={{color: '#1e293b'}}>
          {showForgot ? "Reset Password" : isLogin ? "Login" : "Register"}
        </h1>
        
      {!showForgot && (
        <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-2 rounded" style={{borderColor: '#2563eb'}}
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City/Village"
              value={form.city}
              onChange={handleChange}
              className="w-full border p-2 rounded" style={{borderColor: '#2563eb'}}
              required
            />
            <input
              type="text"
              name="guardian"
              placeholder="Guardian Number"
              value={form.guardian}
              onChange={handleChange}
              className="w-full border p-2 rounded" style={{borderColor: '#2563eb'}}
              required
            />
            <input
              type="text"
              name="aadhaar"
              placeholder="Aadhaar Number (12 digits)"
              value={form.aadhaar}
              onChange={(e) => {
                const onlyDigits = e.target.value.replace(/\D/g, "");
                setForm({ ...form, aadhaar: onlyDigits.slice(0, 12) });
              }}
              inputMode="numeric"
              pattern="\d{12}"
              maxLength={12}
              className="w-full border p-2 rounded" style={{borderColor: '#2563eb'}}
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-2" style={{color: '#1e293b'}}>Room Number:</label>
                <select
                  name="room"
                  value={form.room}
                  onChange={handleSelectChange}
                  className="w-full border-2 p-2 rounded-lg focus:outline-none" style={{borderColor: '#2563eb', backgroundColor: '#f8fafc'}}
                  required
                >
                  <option value="">Select Room</option>
                  {Array.from({ length: 50 }, (_, i) => (
                    <option key={i + 1} value={`Room${i + 1}`}>
                      🏠 Room {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold mb-2" style={{color: '#1e293b'}}>Bed Number:</label>
                <select
                  name="bed"
                  value={form.bed}
                  onChange={handleSelectChange}
                  className="w-full border-2 p-2 rounded-lg focus:outline-none" style={{borderColor: '#2563eb', backgroundColor: '#f8fafc'}}
                  required
                >
                  <option value="">Select Bed</option>
                  {Array.from({ length: 7 }, (_, i) => (
                    <option key={i + 1} value={`Bed${i + 1}`}>
                      🛏️ Bed {i + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </>
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
          {isLogin && (
            <div className="text-right -mt-2">
              <button
                type="button"
                className="text-sm text-blue-600 hover:underline"
                onClick={() => setShowForgot(true)}
              >
                Forgot password?
              </button>
            </div>
          )}
        <button type="submit" className="w-full text-white px-4 py-2 rounded-lg transition font-bold" style={{backgroundColor: '#2563eb'}} onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = '#1d4ed8'} onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = '#2563eb'}>
          {isLogin ? "Login" : "Register"}
        </button>
        </form>
      )}
        {showForgot && (
        <>
          {!otpSent ? (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <input
                type="email"
                placeholder="Registered Email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="w-full border p-2 rounded" style={{borderColor: '#2563eb'}}
                required
              />
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  className="text-gray-600 hover:underline"
                  onClick={() => setShowForgot(false)}
                >
                  Back to login
                </button>
                <button type="submit" className="text-white px-4 py-2 rounded-lg transition font-bold" style={{backgroundColor: '#2563eb'}} onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = '#1d4ed8'} onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = '#2563eb'}>
                  Send OTP
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleOtpVerification} className="space-y-4">
              <div className="text-center mb-4">
                <p className="text-sm text-gray-600">OTP sent to {resetEmail}</p>
                <p className="text-xs text-gray-500 mt-1">Check your email for the 6-digit code</p>
              </div>
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => {
                  const onlyDigits = e.target.value.replace(/\D/g, "");
                  setOtp(onlyDigits.slice(0, 6));
                }}
                maxLength={6}
                className="w-full border p-2 rounded text-center text-lg tracking-widest"
                required
              />
              <input
                type="password"
                placeholder="New Password"
                value={resetPassword}
                onChange={(e) => setResetPassword(e.target.value)}
                className="w-full border p-2 rounded" style={{borderColor: '#2563eb'}}
                required
              />
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  className="text-gray-600 hover:underline"
                  onClick={() => {
                    setOtpSent(false);
                    setOtp("");
                    setResetPassword("");
                  }}
                >
                  Back to email
                </button>
                <button type="submit" className="text-white px-4 py-2 rounded-lg transition font-bold" style={{backgroundColor: '#2563eb'}} onMouseEnter={(e) => (e.target as HTMLElement).style.backgroundColor = '#1d4ed8'} onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = '#2563eb'}>
                  Reset Password
                </button>
              </div>
            </form>
          )}
        </>
        )}
        <p className="mt-4 text-center font-medium" style={{color: '#64748b'}}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button className="font-bold transition" style={{color: '#2563eb'}} onMouseEnter={(e) => (e.target as HTMLElement).style.color = '#1d4ed8'} onMouseLeave={(e) => (e.target as HTMLElement).style.color = '#2563eb'} onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Auth;
