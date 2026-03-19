import { useNavigate } from "react-router-dom";
import socket from "../socket";
import { Home, Info, LogOut } from "lucide-react";


export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const exitGroup = () => {
    const pass = prompt("Enter password:");

    if (pass === user.password) {
      socket.emit("leave_group", {
        user: user.name,
        group: user.group,
      });

      setTimeout(() => {
        localStorage.clear();
        navigate("/");
      }, 200);
    } else {
      alert("Wrong password");
    }
  };

  if (!user) return null;

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">

      <div className="flex items-center justify-between px-4 py-2 max-w-7xl mx-auto">

        {/* LEFT SECTION */}
        <div className="flex items-center gap-3">

          {/* HOME BUTTON */}
          <button
            onClick={() => navigate("/chat")}
            className="flex items-center gap-1 bg-white text-indigo-600 px-3 py-1.5 rounded-lg text-xs font-semibold shadow hover:scale-105 active:scale-95 transition"
          >
            <Home size={16} />
            <span className="hidden sm:inline">Home</span>
          </button>

          {/* USER INFO */}
          <div className="leading-tight mr-2">
            <p className="font-semibold">{user.name}</p>
            <p className="text-gray-200">Room : {user.group}</p>
          </div>
        </div>

        {/* CENTER TITLE */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <h1 className="text-sm sm:text-lg font-bold tracking-wide">
            Chatting HUB
          </h1>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-2">

          {/* INFO */}
          <button
            onClick={() => navigate("/about")}
            className="flex items-center gap-1 px-2 py-1.5 border border-white rounded-lg text-xs hover:bg-white hover:text-indigo-600 transition"
          >
            <Info size={16} />
            <span className="hidden sm:inline">Info</span>
          </button>

          {/* EXIT */}
          <button
            onClick={exitGroup}
            className="flex items-center gap-1 bg-red-500 px-2 py-1.5 rounded-lg text-xs font-semibold hover:bg-red-600 active:scale-95 transition"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Exit</span>
          </button>

        </div>
      </div>
    </div>
  );
}
