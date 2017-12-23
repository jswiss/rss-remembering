const mongoose = require('mongoose');

// Make sure we are running node 7.6+
const [major,
  minor] = process
    .versions
    .node
    .split('.')
    .map(parseFloat);
if (major <= 7 && minor <= 5) {
  console.log('use Node v7.6 or greater, butthead');
  process.exit();
}

// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

// Connect to our Database and handle an bad connections
mongoose.connect(process.env.DATABASE, { useMongoClient: true });
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose
  .connection
  .on('error', (err) => {
    console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
  });

// READY?! Let's go! import all of our models
require('./models/Person');
require('./models/Grave');
// require('./models/User');

// Start our app!
const app = require('./app');
app.set('port', process.env.PORT || 7575);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
