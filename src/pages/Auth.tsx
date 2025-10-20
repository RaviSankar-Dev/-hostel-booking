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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 flex items-center justify-center p-4 relative">
      {/* Left Side Firecrackers */}
      <div className="fixed left-4 top-1/4 z-10 hidden lg:block">
        <div className="text-4xl animate-bounce">🧨</div>
        <div className="text-3xl animate-pulse mt-2">💥</div>
        <div className="text-2xl animate-bounce mt-3">🎆</div>
        <div className="text-3xl animate-pulse mt-2">✨</div>
        <div className="text-2xl animate-bounce mt-3">🎇</div>
      </div>

      {/* Right Side Firecrackers */}
      <div className="fixed right-4 top-1/4 z-10 hidden lg:block">
        <div className="text-4xl animate-bounce">🧨</div>
        <div className="text-3xl animate-pulse mt-2">💥</div>
        <div className="text-2xl animate-bounce mt-3">🎆</div>
        <div className="text-3xl animate-pulse mt-2">✨</div>
        <div className="text-2xl animate-bounce mt-3">🎇</div>
      </div>

      {/* Mobile Firecrackers - Top */}
      <div className="absolute top-2 left-2 z-10 lg:hidden">
        <div className="text-2xl animate-bounce">🧨</div>
        <div className="text-xl animate-pulse">💥</div>
      </div>
      <div className="absolute top-2 right-2 z-10 lg:hidden">
        <div className="text-2xl animate-bounce">🎆</div>
        <div className="text-xl animate-pulse">✨</div>
      </div>
      {/* Diwali Header */}
      <div className="absolute top-4 left-4 right-4 text-center py-2 bg-gradient-to-r from-orange-600 via-yellow-500 to-red-600 text-white rounded-lg shadow-lg">
        <h2 className="text-lg font-bold">🎆 Happy Diwali! 🪔</h2>
      </div>
      

      <div className="max-w-md w-full p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl shadow-lg border-2 border-yellow-300 mt-16">
        <h1 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          {showForgot ? "🪔 Reset Password 🪔" : isLogin ? "🔑 Login 🔑" : "📝 Register 📝"}
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
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="text"
              name="city"
              placeholder="City/Village"
              value={form.city}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
            <input
              type="text"
              name="guardian"
              placeholder="Guardian Number"
              value={form.guardian}
              onChange={handleChange}
              className="w-full border p-2 rounded"
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
              className="w-full border p-2 rounded"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-orange-700 mb-2">🏠 Room Number:</label>
                <select
                  name="room"
                  value={form.room}
                  onChange={handleSelectChange}
                  className="w-full border-2 border-yellow-300 p-2 rounded-lg focus:border-orange-500 focus:outline-none bg-gradient-to-r from-yellow-50 to-orange-50"
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
                <label className="block text-sm font-bold text-orange-700 mb-2">🛏️ Bed Number:</label>
                <select
                  name="bed"
                  value={form.bed}
                  onChange={handleSelectChange}
                  className="w-full border-2 border-yellow-300 p-2 rounded-lg focus:border-orange-500 focus:outline-none bg-gradient-to-r from-yellow-50 to-orange-50"
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
        <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-red-600 transition font-bold">
          {isLogin ? "🪔 Login 🪔" : "📝 Register 📝"}
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
                className="w-full border p-2 rounded"
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
                <button type="submit" className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-red-600 transition font-bold">
                  📧 Send OTP
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
                className="w-full border p-2 rounded"
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
                <button type="submit" className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-red-600 transition font-bold">
                  🪔 Reset Password
                </button>
              </div>
            </form>
          )}
        </>
        )}
        <p className="mt-4 text-center text-orange-700 font-medium">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button className="text-orange-600 font-bold hover:text-red-600 transition" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "📝 Register 📝" : "🔑 Login 🔑"}
          </button>
        </p>
        <div className="text-center mt-4">
          <p className="text-sm font-bold text-orange-600">🪔 Happy Diwali! May your home be filled with light and joy! 🪔</p>
        </div>
      </div>
    </div>
  );
}

export default Auth;
