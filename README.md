# WEB422 Assignment 1 - Listings API

A Node.js/Express API for managing Airbnb listings using MongoDB Atlas.

## Setup Instructions

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Create a `.env` file with your MongoDB connection string:
   ```
   MONGODB_CONN_STRING=your_mongodb_connection_string_here
   ```

3. **Run Locally:**
   ```bash
   npm start
   ```

4. **Test the API:**
   - Base URL: `http://localhost:8080`
   - Test endpoint: `GET /` should return `{"message": "API Listening"}`

## API Endpoints

- `GET /` - Test endpoint
- `POST /api/listings` - Add a new listing
- `GET /api/listings?page=1&perPage=5&name=search` - Get listings with pagination and optional name filter
- `GET /api/listings/:id` - Get a specific listing by ID
- `PUT /api/listings/:id` - Update a listing
- `DELETE /api/listings/:id` - Delete a listing

## Project Structure

```
listingsAPI/
├── server.js                 # Main server file
├── modules/
│   ├── listingsDB.js        # Database operations
│   └── listingSchema.js     # Mongoose schema
├── package.json             # Dependencies
├── .env                     # Environment variables
├── .gitignore              # Git ignore file
└── README.md               # This file
```

## Deployment

This API is designed to be deployed on Vercel. Make sure to add your MongoDB connection string as an environment variable in Vercel.
