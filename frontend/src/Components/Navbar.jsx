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

      <div className="relative flex items-center justify-between px-4 py-2 max-w-7xl mx-auto">

        {/* LEFT */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/chat")}
            className="flex items-center gap-1 bg-white text-indigo-600 px-3 py-1.5 rounded-lg text-xs font-semibold shadow"
          >
            <Home size={16} />
            <span className="hidden sm:inline">Home</span>
          </button>

          <div className="leading-tight mr-2">
            <p className="font-semibold text-xs sm:text-sm">{user.name}</p>
            <p className="text-gray-200 text-[10px] sm:text-xs">
              Room : {user.group}
            </p>
          </div>
        </div>

        {/* CENTER TITLE (OVERLAY STYLE) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[10px] sm:text-xs font-bold tracking-[0.4em] opacity-80">
          C H A T T I N G - H U B
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/about")}
            className="flex items-center gap-1 px-2 py-1.5 border border-white rounded-lg text-xs"
          >
            <Info size={16} />
            <span className="hidden sm:inline">Info</span>
          </button>

          <button
            onClick={exitGroup}
            className="flex items-center gap-1 bg-red-500 px-2 py-1.5 rounded-lg text-xs font-semibold"
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Exit</span>
          </button>
        </div>
      </div>
    </div>

  );
}
