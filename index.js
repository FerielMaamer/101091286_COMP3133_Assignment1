const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser")
const {ApolloServer} = require('apollo-server');

const DB_URL = "mongodb+srv://fpanda:fpanda@cluster0.gzuk5c6.mongodb.net/COMP3133_Assignment1?retryWrites=true&w=majority"
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose.Promise = global.Promise;

//Apollo Server
//typeDefs:GraphQl Type Definitions
//resolvers: How do we resolve queries/mutations

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");
    return server.listen({port: 5000});    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

async function startServer() {
  await server.start();
  const app = express();
  server.applyMiddleware({ app });
  const port = process.env.PORT || 4000;
  

  app.listen({ port: port }, () =>
    console.log(
      'Server is running on http://localhost/:4000$%7Bserver.graphqlPath%7D%60'
    )
  );
}
startServer();

