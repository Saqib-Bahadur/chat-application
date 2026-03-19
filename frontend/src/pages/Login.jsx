import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [group, setGroup] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    const userData = { name, password, group };

    localStorage.setItem("user", JSON.stringify(userData));

    // ✅ Admin Check
    const admName = 'admin';
    const admPass = 'admin#2005'
    if (name === admName && password === admPass && group === "admin") {
      navigate("/admin");
    } else {
      navigate("/chat");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 px-4">

      <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl p-6 sm:p-8">

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Welcome Users 👋
        </h2>

        {/* FORM */}
        <div className="space-y-4">

          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
          />

          <input
            type="text"
            placeholder="Group ID"
            onChange={(e) => setGroup(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
          />

          {/* BUTTON */}
          <button
            onClick={handleLogin}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 active:scale-95 transition duration-200"
          >
            JOIN
          </button>
        </div>

        {/* FOOTER */}
        <p className="text-center text-xs text-gray-500 mt-6">
          Secure Login • Chat App
        </p>

      </div>
    </div>
  );
}