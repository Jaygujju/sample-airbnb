const mongoose = require('mongoose');

// Define the schema for the reviews
const reviewSchema = new mongoose.Schema({
    _id: String,
    date: Date,
    listing_id: String,
    reviewer_id: String,
    reviewer_name: String,
    comments: String
}, { _id: false });

// Define the schema for the address
const addressSchema = new mongoose.Schema({
    street: String,
    suburb: String,
    government_area: String,
    market: String,
    country: String,
    country_code: String,
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: [Number],
        is_location_exact: Boolean
    }
}, { _id: false });

// Define the schema for the host
const hostSchema = new mongoose.Schema({
    host_id: String,
    host_url: String,
    host_name: String,
    host_location: String,
    host_about: String,
    host_response_time: String,
    host_thumbnail_url: String,
    host_picture_url: String,
    host_neighbourhood: String,
    host_response_rate: Number,
    host_is_superhost: Boolean,
    host_has_profile_pic: Boolean,
    host_identity_verified: Boolean,
    host_listings_count: Number,
    host_total_listings_count: Number,
    host_verifications: [String]
}, { _id: false });

// Define the schema for availability
const availabilitySchema = new mongoose.Schema({
    availability_30: Number,
    availability_60: Number,
    availability_90: Number,
    availability_365: Number
}, { _id: false });

// Define the schema for the images
const imagesSchema = new mongoose.Schema({
    thumbnail_url: String,
    medium_url: String,
    picture_url: String,
    xl_picture_url: String
}, { _id: false });

// Main listing schema
const listingSchema = new mongoose.Schema({
    _id: String,
    listing_url: String,
    name: String,
    summary: String,
    space: String,
    description: String,
    neighborhood_overview: String,
    notes: String,
    transit: String,
    access: String,
    interaction: String,
    house_rules: String,
    property_type: String,
    room_type: String,
    bed_type: String,
    minimum_nights: String,
    maximum_nights: String,
    cancellation_policy: String,
    last_scraped: Date,
    calendar_last_scraped: Date,
    first_review: Date,
    last_review: Date,
    accommodates: Number,
    bedrooms: Number,
    beds: Number,
    number_of_reviews: Number,
    bathrooms: mongoose.Schema.Types.Mixed,
    amenities: [String],
    price: mongoose.Schema.Types.Mixed,
    security_deposit: mongoose.Schema.Types.Mixed,
    cleaning_fee: mongoose.Schema.Types.Mixed,
    extra_people: mongoose.Schema.Types.Mixed,
    guests_included: mongoose.Schema.Types.Mixed,
    images: imagesSchema,
    host: hostSchema,
    address: addressSchema,
    availability: availabilitySchema,
    review_scores: {
        review_scores_accuracy: Number,
        review_scores_cleanliness: Number,
        review_scores_checkin: Number,
        review_scores_communication: Number,
        review_scores_location: Number,
        review_scores_value: Number,
        review_scores_rating: Number
    },
    reviews: [reviewSchema]
}, { 
    collection: 'listingsAndReviews',
    versionKey: false
});

// Create and export the model
const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
