/*******************************************************************************
* * WEB422 – Assignment 1
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: ______________________ Student ID: ______________ Date: ______________
*
* Published URL: ___________________________________________________________
*
********************************************************************************/

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const ListingsDB = require("./modules/listingsDB.js");
const db = new ListingsDB();

const app = express();
const HTTP_PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
    res.json({ message: "API Listening" });
});

// POST /api/listings - Add a new listing
app.post('/api/listings', async (req, res) => {
    try {
        const newListing = await db.addNewListing(req.body);
        res.status(201).json(newListing);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/listings - Get all listings with pagination and optional name filter
app.get('/api/listings', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 10;
        const name = req.query.name || '';
        
        const listings = await db.getAllListings(page, perPage, name);
        res.json(listings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/listings/:id - Get a specific listing by ID
app.get('/api/listings/:id', async (req, res) => {
    try {
        const listing = await db.getListingById(req.params.id);
        if (!listing) {
            return res.status(404).json({ error: "Listing not found" });
        }
        res.json(listing);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT /api/listings/:id - Update a specific listing
app.put('/api/listings/:id', async (req, res) => {
    try {
        const result = await db.updateListingById(req.body, req.params.id);
        if (!result) {
            return res.status(404).json({ error: "Listing not found" });
        }
        res.json({ message: "Listing updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE /api/listings/:id - Delete a specific listing
app.delete('/api/listings/:id', async (req, res) => {
    try {
        const result = await db.deleteListingById(req.params.id);
        if (!result) {
            return res.status(404).json({ error: "Listing not found" });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// Initialize database connection and start server
db.initialize(process.env.MONGODB_CONN_STRING).then(() => {
    app.listen(HTTP_PORT, () => {
        console.log(`server listening on: ${HTTP_PORT}`);
    });
}).catch((err) => {
    console.log(err);
});
