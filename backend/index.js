import express from "express";
import { PORT, mongoDbUrl } from "./config.js";
import mongoose from "mongoose";
import bookRoute from "./routes/bookRoute.js";

const app = express();

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
  .connect(mongoDbUrl)
  .then(() => {
    console.log('App connected to database');

    // only run express server if db connection is successful
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });