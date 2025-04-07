
# Bookaboo

My friend, an avid reader, frequently had problems with organizing and tracking his extensive book collection. He was often frustrated over not having a centralized system to record what books he owned and monitor his progress through each one. To help him with this issue, I set out to create a user-friendly platform for him. The goal was to design a simple yet effective solution that would allow him to catalog his books, update reading statuses, and manage his collection efficiently.


## Screenshots

Table View
![App Screenshot](/screenshots/Screen%20Shot%202024-03-22%20at%2011.57.30%20PM.png)

Table View - Single Book
![App Screenshot](/screenshots/tableSingle.png)

Cards View
![App Screenshot](/screenshots/Screen%20Shot%202024-03-23%20at%2012.05.45%20AM.png)

Cards View - Single Book
![App Screenshot](/screenshots/cardSingle.png)

Search - Sort - Filter Books
![App Screenshot](/screenshots/Screen%20Shot%202024-03-23%20at%2012.04.23%20AM.png)

Fully mobile responsive
![App Screenshot](/screenshots/Screen%20Shot%202024-03-25%20at%2011.46.12%20AM.png)


## Demo

[Live Demo](https://my-library-pro.onrender.com/)


## Features

- Two display modes: table and cards
- Show, add, edit, delete books
- Automatic book cover images via Google Books API integration
- Search books by title
- Ascending and descending sort by book title, author, format, number of pages, reading status
- Filter books by reading status or book formats
- Individual notes for each book
- Books data is stored consistently in MongoDB Atlas
- Display stack notifications when errors (duplicated books, missing required fields) happen, or when adding, editing, deleting books successfully
- Mobile responsive design


## Lessons Learned

- **API Integration**: Successfully integrated Google Books API to dynamically fetch book cover images, enhancing the visual appeal without manual image uploads.

- **Full Stack Development**: Gained deeper understanding of the MERN stack architecture, particularly in creating a seamless connection between frontend React components and backend Express/MongoDB systems.

- **State Management**: Implemented efficient state management patterns in React to handle complex UI interactions like sorting, filtering, and multiple view modes.

- **Error Handling**: Developed comprehensive error handling strategies across both frontend and backend, with user-friendly notifications using notistack.

- **Responsive Design**: Applied Tailwind CSS to create a fully responsive interface that works on devices of all sizes without sacrificing functionality.

- **Environment Configuration**: Learned to properly configure an application to handle both development and production environments, including environment-aware API base URLs.

- **Deployment Strategy**: Successfully implemented a build process where frontend assets are served by the backend for simplified deployment.


## Tech Stack

MongoDB, Express, React, Tailwind CSS, Node.js, and Vite.


## Tools and Other Technologies

VS Code, Render, Postman, and Mockaroo.
