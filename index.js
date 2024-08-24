const express = require("express");

const app = express();
require("dotenv").config();
app.use(express.json());

// Dummy Data
let users = [
  { id: "1", name: "Alice" },
  { id: "2", name: "Bob" },
  { id: "3", name: "Charlie" },
];

let chats = [
  {
    id: "1",
    name: "Chat 1",
    participants: ["1", "2"], // Alice and Bob
    createdAt: new Date("2024-08-22T10:00:00Z"),
    updatedAt: new Date("2024-08-22T10:00:00Z"),
  },
  {
    id: "2",
    name: "Chat 2",
    participants: ["2", "3"], // Bob and Charlie
    createdAt: new Date("2024-08-23T11:00:00Z"),
    updatedAt: new Date("2024-08-23T11:00:00Z"),
  },
  {
    id: "3",
    name: "Chat 3",
    participants: ["1", "3"], // Alice and Charlie
    createdAt: new Date("2024-08-21T09:00:00Z"),
    updatedAt: new Date("2024-08-21T09:00:00Z"),
  },
];

let messages = [
  {
    id: 1,
    userId: "1",
    chatId: "1",
    content: "Hello Bob!",
    createdAt: new Date("2024-08-22T10:05:00Z"),
    updatedAt: new Date("2024-08-22T10:05:00Z"),
  },
  {
    id: 2,
    userId: "2",
    chatId: "1",
    content: "Hey Alice!",
    createdAt: new Date("2024-08-22T10:10:00Z"),
    updatedAt: new Date("2024-08-22T10:10:00Z"),
  },
  {
    id: 3,
    userId: "2",
    chatId: "2",
    content: "Hi Charlie!",
    createdAt: new Date("2024-08-23T11:05:00Z"),
    updatedAt: new Date("2024-08-23T11:05:00Z"),
  },
  {
    id: 4,
    userId: "3",
    chatId: "2",
    content: "What's up Bob?",
    createdAt: new Date("2024-08-23T11:15:00Z"),
    updatedAt: new Date("2024-08-23T11:15:00Z"),
  },
  {
    id: 5,
    userId: "1",
    chatId: "3",
    content: "Hey Charlie!",
    createdAt: new Date("2024-08-21T09:05:00Z"),
    updatedAt: new Date("2024-08-21T09:05:00Z"),
  },
  {
    id: 6,
    userId: "3",
    chatId: "3",
    content: "Hello Alice!",
    createdAt: new Date("2024-08-21T09:10:00Z"),
    updatedAt: new Date("2024-08-21T09:10:00Z"),
  },
];


// GET chats by user ID (List of chats that the user is involved in)
app.get("/chats/:userId", (req, res) => {
  const userChats = chats.filter((chat) =>
    chat.participants.includes(req.params.userId)
  );
  res.json(userChats);
});

// GET messages by chat ID (Messages within a specific chat)
app.get("/messages/:chatId", (req, res) => {
  const chatMessages = messages.filter(
    (message) => message.chatId === req.params.chatId
  );
  res.json(chatMessages);
});

// POST a new message (Add a message to a chat by a specific user)
app.post("/messages/:userId/:chatId", (req, res) => {
  const newMessage = {
    id: messages.length + 1,
    userId: req.params.userId,
    chatId: req.params.chatId,
    content: req.body.content,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  messages.push(newMessage);
  res.json(newMessage);
});

// PUT a message by message ID (Edit a specific message)
app.put("/messages/:messageId", (req, res) => {
  const message = messages.find((message) => message.id == req.params.messageId);
  if (message) {
    message.content = req.body.content;
    message.updatedAt = new Date();
    res.json(message);
  } else {
    res.status(404).json({ error: "Message not found" });
  }
});

// DELETE a message by message ID (Remove a specific message)
app.delete("/messages/:messageId", (req, res) => {
  const initialLength = messages.length;
  messages = messages.filter((message) => message.id != req.params.messageId);
  if (messages.length < initialLength) {
    res.json({ message: "Message deleted" });
  } else {
    res.status(404).json({ error: "Message not found" });
  }
});


// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
