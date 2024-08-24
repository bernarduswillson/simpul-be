const express = require("express");

const app = express();

require("dotenv").config();

app.use(express.json());

const connectDB = require("./connectMongo");

connectDB();

const BookModel = require("./models/book.model");

app.get("/books", async (req, res) => {
  const books = await BookModel.find();
  res.json(books);
});

app.post("/books", async (req, res) => {
  const newBook = new BookModel(req.body);
  const result = await newBook.save();
  res.json(result);
});


const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});