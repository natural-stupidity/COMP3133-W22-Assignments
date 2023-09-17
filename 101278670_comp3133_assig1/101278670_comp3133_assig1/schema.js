const { gql } = require('apollo-server-express');

exports.typeDefs = gql`
    scalar Date
    type User {
        id: ID!
        username: String!
        firstname: String!
        lastname: String!
        password: String!
        email: String!
        type: String!
    }
    type Listing {
        id: ID!
        listing_id: String!
        listing_title: String!
        description: String!
        street: String!
        city: String!
        postal_code: String!
        price: Float!
        email: String!
        username: String!
    }
    type Booking {
        id: ID!
        listing_id: String!
        booking_id: String!
        booking_date: Date!
        booking_start: Date!
        booking_end: Date!
        username: String!
    }
    type Query {
        login(username: String!, password: String!) : String
        getBookings(username: String, type: String!) : [Booking]
        getListings(type: String) : [Listing]
        getListingByName(listing_title: String!) : [Listing]
        getListingByCity(city: String!) : [Listing]
        getListingByZip(postal_code: String!) : [Listing]
    }
    type Mutation {
        createUser(username: String! firstname: String! lastname: String! password: String! email: String! type: String!) : User
        createListing(listing_id: String! listing_title: String! description: String! street: String! city: String! postal_code: String! price: Float! email: String! username: String! type: String!) : Listing
        createBooking(listing_id: String! booking_id: String! booking_start: Date! booking_end: Date! username: String! type: String!) : Booking
    }
`