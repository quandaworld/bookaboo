import express from "express";
import mongoose from "mongoose";
import bookRoute from "./routes/bookRoute.js";
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import 'dotenv/config';

const app = express();
const uri = process.env.MONGODB_URI;
const port = process.env.PORT;

// Resolving dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use client app 
app.use(express.static(path.join(__dirname, 'dist')));
app.get('/', (request, response) => {
  request.sendFile(path.join(__dirname, 'dist/index.html'));
})

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

// Connecting to db
mongoose
  .connect(uri)
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