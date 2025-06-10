const mongoose = require('mongoose');
const Listing = require('./listingSchema.js');

class ListingsDB {
    constructor() {
        this.Listing = null;
    }

    async initialize(connectionString) {
        try {
            await mongoose.connect(connectionString, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            
            console.log("Connected to MongoDB successfully");
            this.Listing = Listing;
            return Promise.resolve();
        } catch (error) {
            console.error("Failed to connect to MongoDB:", error);
            return Promise.reject(error);
        }
    }

    async addNewListing(data) {
        try {
            const newListing = new this.Listing(data);
            const savedListing = await newListing.save();
            return savedListing;
        } catch (error) {
            throw new Error(`Error adding new listing: ${error.message}`);
        }
    }

    async getAllListings(page, perPage, name) {
        try {
            let query = {};
            
            // If name parameter is provided, filter by name (case-insensitive)
            if (name && name.trim() !== '') {
                query.name = { $regex: name, $options: 'i' };
            }

            const skip = (page - 1) * perPage;
            
            const listings = await this.Listing
                .find(query)
                .sort({ number_of_reviews: 1 }) // Sort by number_of_reviews ascending
                .skip(skip)
                .limit(perPage)
                .lean(); // Use lean() for better performance

            return listings;
        } catch (error) {
            throw new Error(`Error getting listings: ${error.message}`);
        }
    }

    async getListingById(id) {
        try {
            const listing = await this.Listing.findById(id);
            return listing;
        } catch (error) {
            if (error.name === 'CastError') {
                throw new Error('Invalid listing ID format');
            }
            throw new Error(`Error getting listing by ID: ${error.message}`);
        }
    }

    async updateListingById(data, id) {
        try {
            const updatedListing = await this.Listing.findByIdAndUpdate(
                id, 
                data, 
                { new: true, runValidators: true }
            );
            return updatedListing;
        } catch (error) {
            if (error.name === 'CastError') {
                throw new Error('Invalid listing ID format');
            }
            throw new Error(`Error updating listing: ${error.message}`);
        }
    }

    async deleteListingById(id) {
        try {
            const deletedListing = await this.Listing.findByIdAndDelete(id);
            return deletedListing;
        } catch (error) {
            if (error.name === 'CastError') {
                throw new Error('Invalid listing ID format');
            }
            throw new Error(`Error deleting listing: ${error.message}`);
        }
    }
}

module.exports = ListingsDB;
