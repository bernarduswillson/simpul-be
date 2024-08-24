const express = require("express");
const cors = require("cors");
const authenticateApiKey = require("./middleware");

const app = express();
require("dotenv").config();
app.use(express.json());

// Enable CORS
app.use(cors({
  origin: "*"
}));

// Use the API key middleware for all routes
app.use(authenticateApiKey);


// Models (Structs)
const userModel = {
  id: "string",  // Unique identifier for the user
  name: "string" // User's name
};

const chatModel = {
  id: "string",            // Unique identifier for the chat
  name: "string",          // Name of the chat
  participants: ["string"], // Array of user IDs participating in the chat
  createdAt: new Date(),   // Date when the chat was created
  isUpdated: false         // Boolean indicating if the chat was updated
};

const messageModel = {
  id: "number",            // Unique identifier for the message
  userId: "string",        // ID of the user who sent the message
  chatId: "string",        // ID of the chat where the message was sent
  content: "string",       // Content of the message
  createdAt: new Date(),   // Date when the message was created
  isUpdated: false         // Boolean indicating if the message was updated
};


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
    isUpdated: false,
  },
  {
    id: "2",
    name: "Chat 2",
    participants: ["2", "3"], // Bob and Charlie
    createdAt: new Date("2024-08-23T11:00:00Z"),
    isUpdated: false,
  },
  {
    id: "3",
    name: "Chat 3",
    participants: ["1", "3"], // Alice and Charlie
    createdAt: new Date("2024-08-21T09:00:00Z"),
    isUpdated: false,
  },
];

let messages = [
  {
    id: 1,
    userId: "1",
    chatId: "1",
    content: "Hello Bob!",
    createdAt: new Date("2024-08-22T10:05:00Z"),
    isUpdated: false,
  },
  {
    id: 2,
    userId: "2",
    chatId: "1",
    content: "Hey Alice!",
    createdAt: new Date("2024-08-22T10:10:00Z"),
    isUpdated: false,
  },
  {
    id: 3,
    userId: "2",
    chatId: "2",
    content: "Hi Charlie!",
    createdAt: new Date("2024-08-23T11:05:00Z"),
    isUpdated: false,
  },
  {
    id: 4,
    userId: "3",
    chatId: "2",
    content: "What's up Bob?",
    createdAt: new Date("2024-08-23T11:15:00Z"),
    isUpdated: false,
  },
  {
    id: 5,
    userId: "1",
    chatId: "3",
    content: "Hey Charlie!",
    createdAt: new Date("2024-08-21T09:05:00Z"),
    isUpdated: false,
  },
  {
    id: 6,
    userId: "3",
    chatId: "3",
    content: "Hello Alice!",
    createdAt: new Date("2024-08-21T09:10:00Z"),
    isUpdated: false,
  },
];


// Utils
const formatResponse = (status, message, data) => ({
  status,
  message,
  data,
});

const findLastIndex = (array) => {
  return array.length ? array[array.length - 1].id : 0;
};


// GET chats by user ID (List of chats that the user is involved in)
app.get("/api/chats/:userId", (req, res) => {
  const userChats = chats.filter((chat) =>
    chat.participants.includes(req.params.userId)
  );
  res.json(formatResponse("success", "Chats retrieved successfully", userChats));
});

// GET messages by chat ID (Messages within a specific chat)
app.get("/api/messages/:chatId", (req, res) => {
  const chatMessages = messages.filter(
    (message) => message.chatId === req.params.chatId
  );
  res.json(formatResponse("success", "Messages retrieved successfully", chatMessages));
});

// POST a new message (Add a message to a chat by a specific user)
app.post("/api/messages/:userId/:chatId", (req, res) => {
  const newMessage = {
    id: findLastIndex(messages) + 1,
    userId: req.params.userId,
    chatId: req.params.chatId,
    content: req.body.content,
    createdAt: new Date(),
    isUpdated: false,
  };
  messages.push(newMessage);
  res.status(201).json(formatResponse("success", "Message created successfully", newMessage));
});

// PUT a message by message ID (Edit a specific message)
app.put("/api/messages/:messageId", (req, res) => {
  const message = messages.find((message) => message.id == req.params.messageId);
  if (message) {
    message.content = req.body.content;
    message.isUpdated = true;
    res.json(formatResponse("success", "Message updated successfully", message));
  } else {
    res.status(404).json(formatResponse("error", "Message not found", null));
  }
});

// DELETE a message by message ID (Remove a specific message)
app.delete("/api/messages/:messageId", (req, res) => {
  const initialLength = messages.length;
  messages = messages.filter((message) => message.id != req.params.messageId);
  if (messages.length < initialLength) {
    res.json(formatResponse("success", "Message deleted successfully", null));
  } else {
    res.status(404).json(formatResponse("error", "Message not found", null));
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
