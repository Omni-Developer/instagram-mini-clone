# Mini Instagram Clone

A full-stack web application that mimics basic Instagram functionality, allowing users to create, view, edit, and delete posts with images.

## Features

- **Create Posts**: Upload images with titles and captions
- **View Feed**: Display all user posts in chronological order
- **Edit Posts**: Modify existing posts including images
- **Delete Posts**: Remove posts from the feed
- **Image Storage**: Cloud-based image storage using ImageKit
- **Responsive Design**: Clean, modern UI built with React

## Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool and development server
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS** - Styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **ImageKit** - Image storage and optimization
- **Multer** - Middleware for handling file uploads
- **CORS** - Cross-origin resource sharing

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- ImageKit account for image storage

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/mini-instagram-clone.git
   cd mini-instagram-clone
   ```

2. **Install backend dependencies**
   ```bash
   cd Backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../Frontend
   npm install
   ```

4. **Set up environment variables**

   Create a `.env` file in the `Backend` directory with the following variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
   ```

   You'll need to:
   - Get a MongoDB connection string (local or from MongoDB Atlas)
   - Create an ImageKit account and get your private key

## Usage

1. **Start the backend server**
   ```bash
   cd Backend
   npm start
   ```
   The server will run on `http://localhost:3000`

2. **Start the frontend development server**
   ```bash
   cd Frontend
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

3. **Open your browser** and navigate to `http://localhost:5173`

## API Endpoints

### Posts
- `POST /upload-post` - Create a new post
- `GET /all-post?ownerId=<id>` - Get all posts for a user
- `GET /post/:id?ownerId=<id>` - Get a specific post
- `PATCH /update-post/:id` - Update a post
- `DELETE /delete-post/:id?ownerId=<id>` - Delete a post

### Request/Response Examples

**Create Post:**
```javascript
const formData = new FormData();
formData.append('image', file);
formData.append('title', 'My Post Title');
formData.append('content', 'Post caption');
formData.append('ownerId', 'user123');

fetch('http://localhost:3000/upload-post', {
  method: 'POST',
  body: formData
});
```

**Get Posts:**
```javascript
fetch('http://localhost:3000/all-post?ownerId=user123')
  .then(res => res.json())
  .then(data => console.log(data.posts));
```

## Project Structure

```
mini-instagram-clone/
├── Backend/
│   ├── src/
│   │   ├── app.js              # Express app setup and routes
│   │   ├── db/
│   │   │   └── db.js           # MongoDB connection
│   │   ├── models/
│   │   │   └── post.model.js   # Post schema
│   │   └── services/
│   │       └── storage.service.js # ImageKit integration
│   ├── server.js               # Server entry point
│   ├── package.json
│   └── .gitignore
├── Frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── CreatePost.jsx  # Post creation/editing page
│   │   │   └── Feed.jsx        # Posts feed page
│   │   ├── App.jsx             # Main app component
│   │   ├── main.jsx            # React entry point
│   │   └── assets/             # Static assets
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── .gitignore                  # Root gitignore
└── README.md
```

## User Identification

The application uses a simple visitor ID system stored in localStorage to identify users. Each user gets a unique ID generated on first visit, allowing them to manage their own posts.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Future Enhancements

- User authentication and registration
- User profiles and following system
- Likes and comments on posts
- Image filters and editing
- Real-time notifications
- Search functionality
- Pagination for large feeds