import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Users, MessageSquare, Plus } from "lucide-react";

export default function Admin() {
  const [groups, setGroups] = useState([]);
  const [chats, setChats] = useState({});
  const [groupUsers, setGroupUsers] = useState({});
  const [newGroup, setNewGroup] = useState("");

  useEffect(() => {
    fetchGroups();
    fetchChats();
    fetchUsers();
  }, []);

  const fetchGroups = async () => {
    const res = await axios.get("https://chat-application-ga08.onrender.com/groups");
    setGroups(res.data);
  };

  const fetchChats = async () => {
    const res = await axios.get("https://chat-application-ga08.onrender.com/all-chats");
    setChats(res.data);
  };

  const fetchUsers = async () => {
    const res = await axios.get("https://chat-application-ga08.onrender.com/group-users");
    setGroupUsers(res.data);
  };

  const createGroup = async () => {
    if (!newGroup.trim()) return;

    await axios.post("https://chat-application-ga08.onrender.com/groups", {
      name: newGroup,
    });

    setNewGroup("");
    fetchGroups();
  };

  const deleteGroup = async (name) => {
    await axios.delete(`https://chat-application-ga08.onrender.com/groups/${name}`);
    fetchGroups();
  };

  return (

    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">

      {/* HEADER */}
      <div className="max-w-6xl mx-auto mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-indigo-600">
          🛠 Admin Dashboard
        </h2>
        <p className="text-gray-500 text-sm">
          Manage groups, users and chats easily
        </p>
      </div>

      {/* CREATE GROUP */}
      <div className="max-w-6xl mx-auto bg-white p-4 rounded-xl shadow mb-6 flex flex-col sm:flex-row gap-3">

        <input
          placeholder="Enter new group name..."
          value={newGroup}
          onChange={(e) => setNewGroup(e.target.value)}
          className="flex-1 border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <button
          onClick={createGroup}
          className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 active:scale-95 transition"
        >
          <Plus size={16} />
          Create
        </button>
      </div>

      {/* GROUPS */}
      <div className="max-w-6xl mx-auto grid gap-5">

        {groups.map((g) => (
          <div
            key={g}
            className="bg-white rounded-xl shadow-md p-4 border hover:shadow-lg transition"
          >

            {/* HEADER */}
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-lg text-gray-800">{g}</h3>

              <button
                onClick={() => deleteGroup(g)}
                className="flex items-center gap-1 text-red-500 text-sm hover:text-red-600"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>

            {/* MEMBERS */}
            <div className="mb-4">
              <h4 className="flex items-center gap-2 text-sm font-semibold text-indigo-600 mb-2">
                <Users size={16} /> Members
              </h4>

              <div className="flex flex-wrap gap-2">
                {(groupUsers[g] || []).length === 0 ? (
                  <p className="text-xs text-gray-400">No members</p>
                ) : (
                  (groupUsers[g] || []).map((m, i) => (
                    <span
                      key={i}
                      className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-xs"
                    >
                      👤 {m}
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* CHATS */}
            <div>
              <h4 className="flex items-center gap-2 text-sm font-semibold text-green-600 mb-2">
                <MessageSquare size={16} /> Chats
              </h4>

              <div className="max-h-40 overflow-y-auto space-y-2 pr-1">
                {(chats[g] || []).length === 0 ? (
                  <p className="text-xs text-gray-400">No messages</p>
                ) : (
                  (chats[g] || []).map((m, i) => (
                    <div
                      key={i}
                      className="bg-gray-50 p-2 rounded-lg text-xs border"
                    >
                      <p className="font-semibold text-gray-700">
                        {m.user}
                        <span className="text-gray-400 ml-2 text-[10px]">
                          {m.time}
                        </span>
                      </p>
                      <p className="text-gray-600">{m.text}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}