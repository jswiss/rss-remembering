const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

const graveSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a name', // defaults to true, and this acts as the error msg
  },
  slug: String,
});

graveSchema.pre('save', async function (next) {
  if (!this.isModified('name')) {
    next(); // skip it
    return; // stop this function from running
  }
  // this requires a real function
  this.slug = slug(this.name);
  // check if the slug is unique
  const slugRegex = new RegExp(`^(${this.slug})((-[0-9]*$)?)`, 'i');
  const graveWithSlug = await this.constructor.find({ slug: slugRegex });
  if (graveWithSlug.length) {
    this.slug = `${this.slug}-${graveWithSlug.length + 1}`;
  }
  // remember 'next()' for middleware!
  next();
  // TODO: Make more resilient so slugs are unique
});

module.exports = mongoose.model('Grave', graveSchema);