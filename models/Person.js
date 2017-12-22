const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// allows us to make url-friendly names
const slug = require('slugs');

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a name', // defaults to true, and this acts as the error msg
  },
  slug: String,
  status: {
    type: String,
    required: 'Every person must be either deceased or missing',
    trim: true,
    enum: ['deceased', 'missing']
  },
});

// Pre-save hook in MongoDB to auto create a slug
personSchema.pre('save', async function (next) {
  if (!this.isModified('name')) {
    next(); // skip it
    return; // stop this function from running
  }
  // this requires a real function
  this.slug = slug(this.name);
  // check if the slug is unique
  const slugRegex = new RegExp(`^(${this.slug})((-[0-9]*$)?)`, 'i');
  const personWithSlug = await this.constructor.find({ slug: slugRegex });
  if (personWithSlug.length) {
    this.slug = `${this.slug}-${personWithSlug.length + 1}`;
  }
  // remember 'next()' for middleware!
  next();
  // TODO: Make more resilient so slugs are unique
});

module.exports = mongoose.model('Person', personSchema);