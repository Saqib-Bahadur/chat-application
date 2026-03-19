import { useEffect, useState, useRef } from "react";
import socket from "../socket";
import Navbar from "../Components/Navbar";
import { Send } from "lucide-react";

export default function Chat() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState(
    JSON.parse(localStorage.getItem(user.group)) || []
  );
  const [members, setMembers] = useState([]);

  const bottomRef = useRef(null);


  useEffect(() => {
    socket.emit("join_group", {
      group: user.group,
      user: user.name,
    });

    // ✅ HANDLERS (IMPORTANT)
    const handleLoadMessages = (serverMessages) => {
      setMessages(serverMessages);
      localStorage.setItem(user.group, JSON.stringify(serverMessages));
    };

    const handleReceiveMessage = (message) => {
      setMessages((prev) => {
        const updated = [...prev, message];
        localStorage.setItem(user.group, JSON.stringify(updated));
        return updated;
      });
    };

    const handleGroupUsers = (users) => {
      setMembers(users);
    };

    // ✅ ATTACH LISTENERS
    socket.on("load_messages", handleLoadMessages);
    socket.on("receive_message", handleReceiveMessage);
    socket.on("group_users", handleGroupUsers);

    // ✅ CLEANUP (VERY IMPORTANT)
    return () => {
      socket.off("load_messages", handleLoadMessages);
      socket.off("receive_message", handleReceiveMessage);
      socket.off("group_users", handleGroupUsers);
    };
  }, [user.group]);

  // ✅ AUTO SCROLL
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getTime = () => {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const sendMessage = () => {
    if (!msg.trim()) return;

    const messageData = {
      user: user.name,
      text: msg,
      time: getTime(),
    };

    socket.emit("send_message", {
      group: user.group,
      message: messageData,
    });

    setMsg("");
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">

      {/* NAVBAR */}
      <Navbar user={user} />

      {/* CHAT AREA */}
      <div className="flex-1 overflow-y-auto pt-16 pb-20 px-3">

        {/* MEMBERS */}
        <div className=" sm:flex flex-wrap gap-2 mb-3 bg-white p-3 rounded-xl shadow-sm">
          Online : {members.map((m, i) => (
            <span
              key={i}
              className="text-xs bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full font-medium"
            >
              {m}
            </span>
          ))}
        </div>

        {/* MESSAGES */}
        <div className="space-y-3">
          {messages.map((m, i) => {
            const isMe = m.user === user.name;

            return (
              <div
                key={i}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm shadow-md
                  ${isMe
                      ? "bg-indigo-600 text-white rounded-br-sm"
                      : "bg-white text-gray-800 rounded-bl-sm border"
                    }`}
                >
                  {!isMe && (
                    <p className="text-xs font-semibold text-indigo-500 mb-1">
                      {m.user}
                    </p>
                  )}

                  <p>{m.text}</p>

                  <p
                    className={`text-[10px] mt-1 text-right ${isMe ? "text-gray-200" : "text-gray-400"
                      }`}
                  >
                    {m.time}
                  </p>
                </div>
              </div>
            );
          })}
          <div ref={bottomRef}></div>
        </div>
      </div>

      {/* INPUT BOX */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t px-3 py-2 flex items-center gap-2 shadow-lg">

        <input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <button
          onClick={sendMessage}
          className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 active:scale-95 transition"
        >
          <Send size={18} />
        </button>

      </div>
    </div>
  );
}