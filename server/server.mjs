import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const path = require('path');
const express = require('express');
// import ApolloServer
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth');
import { queryTickerClose } from './utils/api.mjs'

//Create Job to update previous day's stocks close
var CronJob = require('cron').CronJob;

// import our typeDefs and resolvers
const { typeDefs, resolvers } = require('./Schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

const startServer = async () => {
  // create a new Apollo server and pass in our schema data
  const server = new ApolloServer({ 
    typeDefs, 
    resolvers, 
    context: authMiddleware 
  });

  // Start the Apollo server
  await server.start();

  // integrate our Apollo server with the Express application as middleware
  server.applyMiddleware({ app });

  // log where we can go to test our GQL API
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};

// Initialize the Apollo server
startServer();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve up static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });}


db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});

//Create Job to update previous day's stocks close
console.log('Before job instantiation');
const job = new CronJob('0 */1 9-23 * * *', async function() {
	const d = new Date();
  const data = queryTickerClose();
	console.log('Every 30 minutes between 9-17:', d);
});
console.log('After job instantiation');
job.start();