const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

/* ================== IN-MEMORY STORAGE ================== */

let groups = ["Frds-GG1-AaSaMa", "Frds-BG1-001","Frds-BCG-001"];
let groupChats = {};
let groupUsers = {};
let socketUserMap = {};

/* ================== SOCKET LOGIC ================== */

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // ✅ JOIN GROUP (FIXED + UNIQUE USER)
  socket.on("join_group", ({ group, user }) => {
    if (!group || !user) return;

    // initialize group
    if (!groupUsers[group]) groupUsers[group] = [];

    // ❌ prevent duplicate usernames
    if (groupUsers[group].includes(user)) {
      socket.emit("username_taken");
      return;
    }

    // join room
    socket.join(group);

    // store mapping
    socketUserMap[socket.id] = { user, group };

    // add user
    groupUsers[group].push(user);

    // send members list
    io.to(group).emit("group_users", groupUsers[group]);

    // send old messages
    socket.emit("load_messages", groupChats[group] || []);
  });

  // ✅ SEND MESSAGE
  socket.on("send_message", ({ group, message }) => {
    if (!groupChats[group]) groupChats[group] = [];

    groupChats[group].push(message);

    io.to(group).emit("receive_message", message);
  });

  // ✅ LEAVE GROUP
  socket.on("leave_group", () => {
    const data = socketUserMap[socket.id];
    if (!data) return;

    const { user, group } = data;

    groupUsers[group] = (groupUsers[group] || []).filter(
      (u) => u !== user
    );

    delete socketUserMap[socket.id];

    io.to(group).emit("group_users", groupUsers[group]);
  });

  // ✅ DISCONNECT
  socket.on("disconnect", () => {
    const data = socketUserMap[socket.id];
    if (!data) return;

    const { user, group } = data;

    groupUsers[group] = (groupUsers[group] || []).filter(
      (u) => u !== user
    );

    delete socketUserMap[socket.id];

    io.to(group).emit("group_users", groupUsers[group]);

    console.log("User disconnected:", socket.id);
  });
});

/* ================== REST APIs ================== */

// GET groups
app.get("/groups", (req, res) => {
  res.json(groups);
});

// CREATE group
app.post("/groups", (req, res) => {
  const { name } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ error: "Group name required" });
  }

  if (groups.includes(name)) {
    return res.status(400).json({ error: "Group already exists" });
  }

  groups.push(name);
  res.json(groups);
});

// DELETE group
app.delete("/groups/:name", (req, res) => {
  const { name } = req.params;

  groups = groups.filter((g) => g !== name);

  delete groupChats[name];
  delete groupUsers[name];

  res.json(groups);
});

// GET all chats
app.get("/all-chats", (req, res) => {
  res.json(groupChats);
});

// GET all users
app.get("/group-users", (req, res) => {
  res.json(groupUsers);
});

/* ================== SERVER ================== */

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});