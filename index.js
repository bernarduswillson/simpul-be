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
  id: "string",   // Unique identifier for the user
  name: "string", // User's name
  photo: "string" // URL to user's profile photo
};

const chatModel = {
  id: "string",            // Unique identifier for the chat
  name: "string",          // Name of the chat
  isGroup: false,          // Boolean indicating if the chat is a group chat
  participants: ["string"],// Array of user IDs participating in the chat
  lastMessageId: "string", // ID of the last message in the chat
};

const messageModel = {
  id: "string",            // Unique identifier for the message
  userId: "string",        // ID of the user who sent the message
  chatId: "string",        // ID of the chat where the message was sent
  content: "string",       // Content of the message
  createdAt: new Date(),   // Date when the message was created
  isUpdated: false,        // Boolean indicating if the message was updated
  readBy: ["string"],      // Array of user IDs who read the message
};


// Dummy Data
let users = [
  { id: "1", name: "Bernardus Willson", photo: "https://randomuser.me/api/portraits/men/75.jpg" },
  { id: "2", name: "FastVisa Support", photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL4_9GIBfGWXeADnwpndnuJBQWkz98u_xPqQ&s" },
  { id: "3", name: "Cameron Phillips", photo: "https://randomuser.me/api/portraits/men/74.jpg" },
  { id: "4", name: "Elizabeth Doe", photo: "https://randomuser.me/api/portraits/women/72.jpg" },
  { id: "5", name: "Mary Hilda", photo: "https://randomuser.me/api/portraits/women/75.jpg" },
  { id: "6", name: "Obaidullah Amarkhil", photo: "https://randomuser.me/api/portraits/men/72.jpg" },
  { id: "7", name: "Elizabeth Doe", photo: "https://randomuser.me/api/portraits/women/74.jpg" },
  { id: "8", name: "Jennifer Lopez", photo: "https://randomuser.me/api/portraits/women/73.jpg" }
];

let chats = [
  {
    id: "1",
    name: "FastVisa Support",
    isGroup: false,
    participants: ["1", "2"],
    lastMessageId: "1"
  },
  {
    id: "2",
    name: "8405-Diana SALAZAR MUNGUIA",
    isGroup: true,
    participants: ["1", "3", "4"],
    lastMessageId: "3"
  },
  {
    id: "3",
    name: "I-589 - AMARKHIL, Obaidullah [Affirmative Filing with ZHN]",
    isGroup: true,
    participants: ["1", "5", "6"],
    lastMessageId: "9"
  },
  {
    id: "4",
    name: "109220-Naturalization",
    isGroup: true,
    participants: ["1", "3", "7", "8"],
    lastMessageId: "11"
  }
];

let messages = [
  {
    id: "1",
    userId: "2",
    chatId: "1",
    content: "Hey there! Welcome to your inbox.",
    createdAt: new Date("2024-08-24T05:19:00Z"),
    isUpdated: false,
    readBy: ["1"]
  },
  {
    id: "2",
    userId: "4",
    chatId: "2",
    content: "Hey, I'm not sure about sharing my personal information. Can you guarantee its safety?",
    createdAt: new Date("2024-08-24T06:19:00Z"),
    isUpdated: false,
    readBy: ["1", "4"]
  },
  {
    id: "3",
    userId: "3",
    chatId: "2",
    content: "I understand your initial concerns and thats very valid, Elizabeth. But you can trust us with your data.",
    createdAt: new Date("2024-08-24T06:30:00Z"),
    isUpdated: false,
    readBy: ["1", "4"]
  },
  {
    id: "4",
    userId: "6",
    chatId: "3",
    content: "Hi, I need the status of the case. Can you please provide an update?",
    createdAt: new Date("2024-08-23T06:19:00Z"),
    isUpdated: false,
    readBy: ["1", "5"]
  },
  {
    id: "5",
    userId: "1",
    chatId: "3",
    content: "No worries. It will be completed ASAP. I’ve asked him yesterday.",
    createdAt: new Date("2024-08-23T06:30:00Z"),
    isUpdated: false,
    readBy: ["5", "6"]
  },
  {
    id: "6",
    userId: "5",
    chatId: "3",
    content: "Hello Obaidullah, I will be your case advisor for case #029290. I have assigned some homework for you to fill. Please keep up with the due dates. Should you have any questions, you can message me anytime. Thanks.",
    createdAt: new Date("2024-08-24T03:35:00Z"),
    isUpdated: false,
    readBy: ["1", "6"]
  },
  {
    id: "7",
    userId: "1",
    chatId: "3",
    content: "Please contact Mary for questions regarding the case bcs she will be managing your forms from now on! Thanks Mary.",
    createdAt: new Date("2024-08-24T06:40:00Z"),
    isUpdated: false,
    readBy: ["5", "6"]
  },
  {
    id: "8",
    userId: "5",
    chatId: "3",
    content: "Sure thing, Willson",
    createdAt: new Date("2024-08-24T06:45:00Z"),
    isUpdated: false,
    readBy: ["1", "6"]
  },
  {
    id: "9",
    userId: "6",
    chatId: "3",
    content: "Morning. I’ll try to do them. Thanks",
    createdAt: new Date("2024-08-24T06:50:00Z"),
    isUpdated: false,
    readBy: ["5"]
  },
  {
    id: "10",
    userId: "3",
    chatId: "4",
    content: "Hi, I need the status of the case. Can you please provide an update?",
    createdAt: new Date("2024-08-23T01:19:00Z"),
    isUpdated: false,
    readBy: []
  },
  {
    id: "11",
    userId: "3",
    chatId: "4",
    content: "Please check this out!",
    createdAt: new Date("2024-08-23T10:20:00Z"),
    isUpdated: false,
    readBy: []
  }
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
  const userId = req.params.userId;
  
  const userChats = chats
    .filter(chat => chat.participants.includes(userId))
    .map(chat => {
      const participants = chat.participants.map(participantId => {
        const user = users.find(user => user.id === participantId);
        return {
          id: user.id,
          name: user.name,
          photo: user.photo
        };
      });

      const lastMessage = messages.find(message => message.id === chat.lastMessageId);

      return {
        id: chat.id,
        name: chat.name,
        isGroup: chat.isGroup,
        participants,
        lastMessage: {
          user: {
            id: users.find(user => user.id === lastMessage.userId).id,
            name: users.find(user => user.id === lastMessage.userId).name
          },
          content: lastMessage.content,
          createdAt: lastMessage.createdAt,
          isUpdated: lastMessage.isUpdated,
          readBy: lastMessage.readBy.map(readerId => {
            const user = users.find(user => user.id === readerId);
            return {
              id: user.id,
              name: user.name
            };
          })
        }
      };
    });

  res.json(formatResponse("success", "Chats retrieved successfully", userChats));
});

// GET messages by chat ID (Messages within a specific chat)
app.get("/api/messages/:chatId", (req, res) => {
  const chatMessages = messages
    .filter(message => message.chatId === req.params.chatId)
    .map(message => {
      const user = users.find(user => user.id === message.userId);
      return {
        id: message.id,
        user: {
          id: user.id,
          name: user.name,
        },
        content: message.content,
        createdAt: message.createdAt,
        isUpdated: message.isUpdated,
        readBy: message.readBy,
      };
    });

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
