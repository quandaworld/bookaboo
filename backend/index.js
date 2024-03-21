import express from "express";
import mongoose from "mongoose";
import bookRoute from "./routes/bookRoute.js";
import cors from 'cors';
import 'dotenv/config';

const app = express();
const url = process.env.mongoDbUrl || "mongodb://localhost:27017/";
const port = process.env.PORT || 5000;

// Middleware for parsing request body
app.use(express.json());

// Middleware for CORS policy
app.use(cors());

app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('Hello Quan');
});

// Run bookRoute for requests with prefix '/books'
app.use('/books', bookRoute);

// Run bookRoute for requests with prefix '/audiobooks'

// Connecting to db
mongoose
  .connect(url)
  .then(() => {
    console.log('App connected to database');

    // only run express server if db connection is successful
    app.listen(port, () => {
      console.log(`App is listening to port: ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });