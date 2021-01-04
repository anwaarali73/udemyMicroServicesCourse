// In order to start this service there is a script in package.json
// called "start": "nodemon index.js"

// So each directory/each microservice

// All of the services' data will be stored in memory and will
// be disposed of with each bootup
// express is server of sorts
const express = require('express');
const { randomBytes } = require('crypto');
const bodyParser = require('body-parser');

const app = express();

// Following is for parsing json in the incoming request objects
app.use(bodyParser.json());

const posts = {};

// Setting up the route handlers
// Data fetching
app.get('/posts', (req, res) => {
  // Send all the posts
  res.send(posts);
});

// Data posting
app.post('/posts', (req, res) => {
  // Random id generation/request
  // First argument is number of bytes
  const id = randomBytes(4).toString('hex');

  // Destructure incoming request to extract the title
  const { title } = req.body;

  // Following is how an object is initialised
  posts[id] = {
    id, title
  };

  // Following '203' is a response code about object creation
  res.status(203).send(posts[id]);
});

// Server listening setup. First argument is the port number
app.listen('4000', () => {
  console.log('Posts server setup and listening on port 4000');
})
