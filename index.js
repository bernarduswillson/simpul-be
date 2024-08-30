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
};

const messageModel = {
  id: "string",            // Unique identifier for the message
  userId: "string",        // ID of the user who sent the message
  chatId: "string",        // ID of the chat where the message was sent
  content: "string",       // Content of the message
  createdAt: new Date(),   // Date when the message was created
  repliedTo: "string",     // ID of the message to which this message is a reply
  isUpdated: false,        // Boolean indicating if the message was updated
  readBy: ["string"],      // Array of user IDs who read the message
};

const taskModel = {
  id: "string",            // Unique identifier for the task
  userId: "string",        // ID of the user to whom the task is assigned
  name: "string",          // Name of the task
  date: new Date(),        // Due date of the task
  description: "string",   // Description of the task
  type: "string",          // Type of the task (e.g., personal, urgent)
  isDone: false,           // Boolean indicating if the task is completed
};


// Initial Data
const initialUsers = [
  { id: "1", name: "Bernardus Willson", photo: "https://randomuser.me/api/portraits/men/75.jpg" },
  { id: "2", name: "FastVisa Support", photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL4_9GIBfGWXeADnwpndnuJBQWkz98u_xPqQ&s" },
  { id: "3", name: "Cameron Phillips", photo: "https://randomuser.me/api/portraits/men/74.jpg" },
  { id: "4", name: "Elizabeth Doe", photo: "https://randomuser.me/api/portraits/women/72.jpg" },
  { id: "5", name: "Mary Hilda", photo: "https://randomuser.me/api/portraits/women/75.jpg" },
  { id: "6", name: "Obaidullah Amarkhil", photo: "https://randomuser.me/api/portraits/men/72.jpg" },
  { id: "7", name: "Elizabeth Doe", photo: "https://randomuser.me/api/portraits/women/74.jpg" },
  { id: "8", name: "Jennifer Lopez", photo: "https://randomuser.me/api/portraits/women/73.jpg" }
];

const initialChats = [
  {
    id: "1",
    name: "FastVisa Support",
    isGroup: false,
    participants: ["1", "2"],
  },
  {
    id: "2",
    name: "8405-Diana SALAZAR MUNGUIA",
    isGroup: true,
    participants: ["1", "3", "4"],
  },
  {
    id: "3",
    name: "I-589 - AMARKHIL, Obaidullah [Affirmative Filing with ZHN]",
    isGroup: true,
    participants: ["1", "5", "6"],
  },
  {
    id: "4",
    name: "109220-Naturalization",
    isGroup: true,
    participants: ["1", "3", "7", "8"],
  }
];

const initialMessages = [
  {
    id: "1",
    userId: "2",
    chatId: "1",
    content: "Hey there! Welcome to your inbox.",
    createdAt: new Date("2024-08-24T05:19:00Z"),
    repliedTo: null,
    isUpdated: false,
    readBy: ["1"]
  },
  {
    id: "2",
    userId: "4",
    chatId: "2",
    content: "Hey, I'm not sure about sharing my personal information. Can you guarantee its safety?",
    createdAt: new Date("2024-08-24T06:19:00Z"),
    repliedTo: null,
    isUpdated: false,
    readBy: ["1", "4"]
  },
  {
    id: "3",
    userId: "3",
    chatId: "2",
    content: "I understand your initial concerns and thats very valid, Elizabeth. But you can trust us with your data.",
    createdAt: new Date("2024-08-24T06:30:00Z"),
    repliedTo: null,
    isUpdated: false,
    readBy: ["1", "4"]
  },
  {
    id: "4",
    userId: "6",
    chatId: "3",
    content: "Hi, I need the status of the case. Can you please provide an update?",
    createdAt: new Date("2024-08-23T06:19:00Z"),
    repliedTo: null,
    isUpdated: false,
    readBy: ["1", "5"]
  },
  {
    id: "5",
    userId: "1",
    chatId: "3",
    content: "No worries. It will be completed ASAP. I’ve asked him yesterday.",
    createdAt: new Date("2024-08-23T06:30:00Z"),
    repliedTo: null,
    isUpdated: false,
    readBy: ["5", "6"]
  },
  {
    id: "6",
    userId: "5",
    chatId: "3",
    content: "Hello Obaidullah, I will be your case advisor for case #029290. I have assigned some homework for you to fill. Please keep up with the due dates. Should you have any questions, you can message me anytime. Thanks.",
    createdAt: new Date("2024-08-24T03:35:00Z"),
    repliedTo: null,
    isUpdated: false,
    readBy: ["1", "6"]
  },
  {
    id: "7",
    userId: "1",
    chatId: "3",
    content: "Please contact Mary for questions regarding the case bcs she will be managing your forms from now on! Thanks Mary.",
    createdAt: new Date("2024-08-24T06:40:00Z"),
    repliedTo: "6",
    isUpdated: false,
    readBy: ["5", "6"]
  },
  {
    id: "8",
    userId: "5",
    chatId: "3",
    content: "Sure thing, Willson",
    createdAt: new Date("2024-08-24T06:45:00Z"),
    repliedTo: null,
    isUpdated: false,
    readBy: ["1", "6"]
  },
  {
    id: "9",
    userId: "6",
    chatId: "3",
    content: "Morning. I’ll try to do them. Thanks",
    createdAt: new Date("2024-08-24T06:50:00Z"),
    repliedTo: null,
    isUpdated: false,
    readBy: ["5"]
  },
  {
    id: "10",
    userId: "3",
    chatId: "4",
    content: "Hi, I need the status of the case. Can you please provide an update?",
    createdAt: new Date("2024-08-23T01:19:00Z"),
    repliedTo: null,
    isUpdated: false,
    readBy: []
  },
  {
    id: "11",
    userId: "3",
    chatId: "4",
    content: "Please check this out!",
    createdAt: new Date("2024-08-23T10:20:00Z"),
    repliedTo: null,
    isUpdated: false,
    readBy: []
  }
];

const initialTasks = [
  {
    id: "1",
    userId: "1",
    name: "Close off Case #012920- RODRIGUES, Amiguel",
    date: "2024-09-24T05:19:00Z",
    description: "Closing off this case since this application has been cancelled. No one really understand how this case could possibly be cancelled. The options and the documents within this document were totally a guaranteed for a success!",
    type: "personal",
    isDone: false,
  },
  {
    id: "2",
    userId: "1",
    name: "Set up documentation report for several Cases : Case 145443, Case 192829 and Case 182203",
    date: "2024-09-25T05:19:00Z",
    description: "All Cases must include all payment transactions, all documents and forms filled. All conversations in comments and messages in channels and emails should be provided as well in.",
    type: "urgent",
    isDone: false,
  },
  {
    id: "3",
    userId: "1",
    name: "Set up appointment with Dr Blake",
    date: "2024-09-26T05:19:00Z",
    description: "",
    type: "personal",
    isDone: false,
  },
  {
    id: "4",
    userId: "1",
    name: "Contact Mr Caleb - video conference?",
    date: "2024-08-24T05:19:00Z",
    description: "This is a description",
    type: "urgent",
    isDone: true,
  },
  {
    id: "5",
    userId: "1",
    name: "Assign 3 homework to Client A",
    date: "2024-08-10T05:19:00Z",
    description: "This is a description",
    type: "personal",
    isDone: true,
  },
];

// Current Data
let users = JSON.parse(JSON.stringify(initialUsers));
let chats = JSON.parse(JSON.stringify(initialChats));
let messages = JSON.parse(JSON.stringify(initialMessages));
let tasks = JSON.parse(JSON.stringify(initialTasks));


// Reset Data
const resetData = () => {
  users = JSON.parse(JSON.stringify(initialUsers));
  chats = JSON.parse(JSON.stringify(initialChats));
  messages = JSON.parse(JSON.stringify(initialMessages));
  tasks = JSON.parse(JSON.stringify(initialTasks));
  console.log("Data reset to initial state.");
};

// API endpoint to reset the data
app.get("/api/reset", (req, res) => {
  resetData();
  res.json(formatResponse("success", "Data reset to initial state", null));
});



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

      const chatMessages = messages.filter(message => message.chatId === chat.id);
      const lastMessage = chatMessages[chatMessages.length - 1] || null;

      return {
        id: chat.id,
        name: chat.name,
        isGroup: chat.isGroup,
        participants,
        lastMessage: lastMessage ? {
          user: {
            id: lastMessage.userId,
            name: users.find(user => user.id === lastMessage.userId).name
          },
          content: lastMessage.content,
          repliedTo: lastMessage.repliedTo ? {
            id: lastMessage.repliedTo,
            name: users.find(user => user.id === messages.find(msg => msg.id === lastMessage.repliedTo).userId).name,
            content: messages.find(msg => msg.id === lastMessage.repliedTo).content
          } : null,
          createdAt: lastMessage.createdAt,
          isUpdated: lastMessage.isUpdated,
          readBy: lastMessage.readBy.map(readerId => {
            const user = users.find(user => user.id === readerId);
            return {
              id: user.id,
              name: user.name
            };
          })
        } : null
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
        repliedTo: {
          id: message.repliedTo,
          name: message.repliedTo ? users.find(user => user.id === messages.find(msg => msg.id === message.repliedTo).userId).name : null,
          content: message.repliedTo ? messages.find(msg => msg.id === message.repliedTo).content : null
        },
        isUpdated: message.isUpdated,
        readBy: message.readBy.map(readerId => {
          const user = users.find(user => user.id === readerId);
          return {
            id: user.id,
            name: user.name
          };
        })
      };
    });

  res.json(formatResponse("success", "Messages retrieved successfully", chatMessages));
});

// POST a new message (Add a message to a chat by a specific user)
app.post("/api/messages/:userId/:chatId", (req, res) => {
  const newMessage = {
    id: (parseInt(findLastIndex(messages)) + 1).toString(),
    userId: req.params.userId,
    chatId: req.params.chatId,
    content: req.body.content,
    createdAt: new Date().toISOString(),
    repliedTo: req.body.repliedTo || null,
    isUpdated: false,
    readBy: []
  };
  messages.push(newMessage);
  const chat = chats.find(chat => chat.id === req.params.chatId);
  if (!chat) {
    return res.status(404).json(formatResponse("error", "Chat not found", null));
  }
  const chatMessages = messages.filter(message => message.chatId === chat.id);
  const lastMessage = chatMessages[chatMessages.length - 1] || null;
  const formattedLastMessage = lastMessage ? {
    id: lastMessage.id,
    user: users.find(user => user.id === lastMessage.userId),
    content: lastMessage.content,
    repliedTo: lastMessage.repliedTo ? {
      id: lastMessage.repliedTo,
      name: users.find(user => user.id === messages.find(msg => msg.id === lastMessage.repliedTo).userId).name,
      content: messages.find(msg => msg.id === lastMessage.repliedTo).content
    } : null,
    createdAt: lastMessage.createdAt,
    isUpdated: lastMessage.isUpdated,
    readBy: []
  } : null;

  res.status(201).json(formatResponse("success", "Message created successfully", { lastMessage: formattedLastMessage }));
});

// PUT a message by message ID (Edit a specific message)
app.put("/api/messages/:messageId", (req, res) => {
  const message = messages.find((message) => message.id == req.params.messageId);

  if (message) {
    message.content = req.body.content;
    message.isUpdated = true;

    const chat = chats.find((chat) => chat.id === message.chatId);
    if (!chat) {
      return res.status(404).json(formatResponse("error", "Chat not found", null));
    }

    const chatMessages = messages.filter((message) => message.chatId === chat.id);
    const lastMessage = chatMessages[chatMessages.length - 1] || null;
    const formattedLastMessage = lastMessage ? {
      chatId: chat.id,
      user: users.find(user => user.id === lastMessage.userId),
      content: lastMessage.content,
      repliedTo: lastMessage.repliedTo ? {
        id: lastMessage.repliedTo,
        name: users.find(user => user.id === messages.find(msg => msg.id === lastMessage.repliedTo).userId).name,
        content: messages.find(msg => msg.id === lastMessage.repliedTo).content
      } : null,
      createdAt: lastMessage.createdAt,
      isUpdated: lastMessage.isUpdated,
      readBy: lastMessage.readBy.map(readerId => ({
        id: readerId,
        name: users.find(user => user.id === readerId).name || "Unknown"
      }))
    } : null;

    res.json(formatResponse("success", "Message updated successfully", { lastMessage: formattedLastMessage }));
  } else {
    res.status(404).json(formatResponse("error", "Message not found", null));
  }
});


// DELETE a message by message ID (Remove a specific message)
app.delete("/api/messages/:messageId", (req, res) => {
  const messageId = req.params.messageId;
  const messageToDelete = messages.find((message) => message.id === messageId);
  if (!messageToDelete) {
    return res.status(404).json(formatResponse("error", "Message not found", null));
  }
  messages = messages.filter((message) => message.id !== messageId);
  const chat = chats.find((chat) => chat.id === messageToDelete.chatId);
  if (!chat) {
    return res.status(404).json(formatResponse("error", "Chat not found", null));
  }
  const chatMessages = messages.filter((message) => message.chatId === chat.id);
  const lastMessage = chatMessages[chatMessages.length - 1] || null;
  chat.lastMessageId = lastMessage ? lastMessage.id : null;
  const formattedLastMessage = lastMessage ? {
    chatId: chat.id,
    user: users.find(user => user.id === lastMessage.userId),
    content: lastMessage.content,
    repliedTo: lastMessage.repliedTo ? {
      id: lastMessage.repliedTo,
      name: users.find(user => user.id === messages.find(msg => msg.id === lastMessage.repliedTo).userId).name,
      content: messages.find(msg => msg.id === lastMessage.repliedTo).content
    } : null,
    createdAt: lastMessage.createdAt,
    isUpdated: lastMessage.isUpdated,
    readBy: lastMessage.readBy.map(readerId => ({
      id: readerId,
      name: users.find(user => user.id === readerId).name || "Unknown"
    }))
  } : null;

  res.json(formatResponse("success", "Message deleted successfully", { lastMessage: formattedLastMessage }));
});


// PUT a message as read by user ID (Mark all messages in a chat as read by a specific user)
app.put("/api/messages/:chatId/read/:userId", (req, res) => {
  const chatId = req.params.chatId;
  const userId = req.params.userId;

  const chat = chats.find((chat) => chat.id === chatId);
  if (!chat) {
    return res.status(404).json(formatResponse("error", "Chat not found", null));
  }

  const chatMessages = messages.filter((message) => message.chatId === chatId);
  chatMessages.forEach((message) => {
    if (!message.readBy.includes(userId)) {
      message.readBy.push(userId);
    }
  });

  const lastMessage = chatMessages[chatMessages.length - 1] || null;
  const formattedLastMessage = lastMessage ? {
    chatId: chat.id,
    user: users.find(user => user.id === lastMessage.userId),
    content: lastMessage.content,
    repliedTo: lastMessage.repliedTo ? {
      id: lastMessage.repliedTo,
      name: users.find(user => user.id === messages.find(msg => msg.id === lastMessage.repliedTo).userId).name,
      content: messages.find(msg => msg.id === lastMessage.repliedTo).content
    } : null,
    createdAt: lastMessage.createdAt,
    isUpdated: lastMessage.isUpdated,
    readBy: lastMessage.readBy.map(readerId => ({
      id: readerId,
      name: users.find(user => user.id === readerId).name || "Unknown"
    }))
  } : null;

  res.json(formatResponse("success", "Messages marked as read successfully", { lastMessage: formattedLastMessage }));
});




// GET all tasks by user ID (List of tasks assigned to the user)
app.get("/api/tasks/:userId", (req, res) => {
  const userId = req.params.userId;
  const userTasks = tasks.filter((task) => task.userId == userId);
  res.json(formatResponse("success", "Tasks retrieved successfully", userTasks));
});

// UPDATE a task by task ID
app.put("/api/tasks/:taskId", (req, res) => {
  const task = tasks.find((task) => task.id == req.params.taskId);
  if (task) {
    task.name = req.body.name !== undefined ? req.body.name : task.name;
    task.date = req.body.date !== undefined ? req.body.date : task.date;
    task.description = req.body.description !== undefined ? req.body.description : task.description;
    task.type = req.body.type !== undefined ? req.body.type : task.type;
    task.isDone = req.body.isDone !== undefined ? req.body.isDone : task.isDone;
    res.json(formatResponse("success", "Task updated successfully", task));
  } else {
    res.status(404).json(formatResponse("error", "Task not found", null));
  }
});

// POST a new task
app.post("/api/tasks", (req, res) => {
  const newTask = {
    id: (parseInt(findLastIndex(tasks)) + 1).toString(),
    userId: req.body.userId,
    name: "",
    date: "",
    description: "",
    type: req.body.type || "personal",
    isDone: false,
  };
  tasks.push(newTask);
  res.status(201).json(formatResponse("success", "Task created successfully", newTask));
});

// DELETE a task by task ID
app.delete("/api/tasks/:taskId", (req, res) => {
  const taskId = req.params.taskId;
  const taskToDelete = tasks.find((task) => task.id == taskId);
  if (!taskToDelete) {
    return res.status(404).json(formatResponse("error", "Task not found", null));
  }
  tasks = tasks.filter((task) => task.id !== taskId);
  res.json(formatResponse("success", "Task deleted successfully", null));
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
