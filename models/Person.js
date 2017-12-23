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
  incidentCategory: {
    type: String,
    trim: true,
    required: 'Please choose an incident category',
    enum: ['December 2013', '1983 - 2005', '1955 - 1972', 'community violence', 'electoral violence', 'other violence']
  },
  bodyWitness: {
    type: String,
    required: 'Whether the body has been withnessed is required',
    enum: ['yes', 'no']
  },
  sex: {
    type: String,
    required: 'sex is required',
    enum: ['male', 'female']
  },
  infant: Boolean,
  age: Number,
  maritalStatus: {
    type: String,
    enum: ['married', 'single', 'separated', 'widowed']
  },
  originLocation: {
    // TODO: add enums to protect data integrity here
    state: String,
    county: String,
    payam: String,
    village: String,
  },
  nationality: {
    type: String,
    enum: ['South Sudanese', 'other']
  },
  military: {
    type: String,
    enum: ['civilian', 'military/militia']
  },
  combatDeath: Boolean,
  deathCategory: String,
  deathDescription: String,
  dateOfDeath: {
    type: Date,
    max: Date.now
  },
  locationOfDeath: {
    // TODO: add enums to protect data integrity here
    state: String,
    county: String,
    payam: String,
    village: String,
  },
  othersWithInformation: [{
    name: String,
    telephone: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      validate: [validateEmail, 'Please fill in a valid email address'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
  }],
  nextOfKin: [{
    name: String,
    telephone: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      validate: [validateEmail, 'Please fill in a valid email address'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
  }],
  informer: {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    telephone: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      validate: [validateEmail, 'Please fill in a valid email address'],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    relationship: {
      type: String,
      required: true,
      trim: true,
    }
  }
});

function validateEmail(email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?w+)+(\.\w{2,3})+$/;
  return re.test(email);
}

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