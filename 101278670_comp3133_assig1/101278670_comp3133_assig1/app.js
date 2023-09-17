const { ApolloServer } = require('apollo-server-express')
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const TypeDefs = require('./schema')
const Resolvers = require('./resolvers')

const DB_URL = 'mongodb+srv://dbUser:efra4DtqyCZqEtLp@cluster0.n33e7.mongodb.net/101278670_comp3133_assig1?retryWrites=true&w=majority'
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('*', cors());

mongoose.Promise = global.Promise;

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

const server = new ApolloServer({
    typeDefs: TypeDefs.typeDefs,
    resolvers: Resolvers.resolvers
})

server.applyMiddleware({ app })

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
