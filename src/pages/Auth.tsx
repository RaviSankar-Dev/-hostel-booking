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
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("students") || "[]");
    setStudents(saved);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      // Login
      const user = students.find(s => s.email === form.email && s.password === form.password);
      if (!user) return alert("Invalid credentials");
      localStorage.setItem("currentUser", user.email);
      navigate("/dashboard");
    } else {
      // Register
      if (!/^\d{12}$/.test(form.aadhaar)) {
        return alert("Please enter a valid 12-digit Aadhaar number");
      }
      if (students.find(s => s.email === form.email)) return alert("Email already exists");

      // Assign room & bed automatically
      const rooms: string[] = JSON.parse(localStorage.getItem("students") || "[]")
        .map((s: any) => s.room);
      const allRooms: string[] = JSON.parse(localStorage.getItem("allRooms") || `["Room1","Room2","Room3"]`);
      const availableRoom = allRooms.find(r => !rooms.includes(r)) || "Room1";

      // Count beds in that room
      const bedsInRoom = students.filter(s => s.room === availableRoom).length + 1;
      const newStudent: Student = {
        email: form.email,
        password: form.password,
        name: form.name,
        city: form.city,
        guardian: form.guardian,
        aadhaar: form.aadhaar,
        room: availableRoom,
        bed: `Bed${bedsInRoom}`,
        payments: {},
      };

      const updatedStudents = [...students, newStudent];
      setStudents(updatedStudents);
      localStorage.setItem("students", JSON.stringify(updatedStudents));
      localStorage.setItem("currentUser", newStudent.email);
      navigate("/dashboard");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">{isLogin ? "Login" : "Register"}</h1>
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
              pattern="\\d{12}"
              maxLength={12}
              className="w-full border p-2 rounded"
              required
            />
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
        <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>
      <p className="mt-4 text-center">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button className="text-blue-600 font-semibold" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Register" : "Login"}
        </button>
      </p>
    </div>
  );
}

export default Auth;
