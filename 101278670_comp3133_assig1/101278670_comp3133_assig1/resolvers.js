const UserModel = require('./models/UserModel');
const SLModel = require('./models/SLModel');
const BookingModel = require('./models/BookingModel');

exports.resolvers = {
    Query: {
        login: async (parent, args) => {
            let user = await UserModel.findOne({ $and: [{ username: args.username }, { password: args.password }] })
            if (!user) { throw new Error("User Not Found.") }
            return user.type
        },
        getBookings: async (parent, args) => {
            let bookings = []
            if (args.username && args.type == "customer") bookings = await BookingModel.find({ username: args.username })
            else if (args.type == "admin") bookings = await BookingModel.find({})
            else throw new Error("Access Denied: You must logged in to view this content.")
            return bookings
        },
        getListings: async (parent, args) => {
            return await SLModel.find({})
        },
        getListingByName: async (parent, args) => { return await SLModel.find(args) },
        getListingByCity: async (parent, args) => { return await SLModel.find(args) },
        getListingByZip: async (parent, args) => { return await SLModel.find(args) },

    },

    Mutation: {
        createUser: async (parent, args) => {
            let user = new UserModel(args)
            return user.save()
        },
        createListing: async (parent, args) => {
            if (args.type == "admin") {
                let listing = new SLModel(args)
                return listing.save()
            }
            throw new Error("Failed to Create Listing.")
        },
        createBooking: async (parent, args) => {
            if (args.type == "customer") {
                let booking = new BookingModel(args)
                return booking.save()
            }
            throw new Error("Failed to Create Booking.")
        }
    }
}