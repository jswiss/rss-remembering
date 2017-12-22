const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const graveSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a name', // defaults to true, and this acts as the error msg
  },
  slug: String,

});

module.exports = mongoose.model('Grave', graveSchema);