const mongoose = require('mongoose');
const Person = mongoose.model('Person');
// const User = mongoose.model('User');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter: function (req, file, next) {
    // file's mimetype tells you the type of file
    const isPhoto = file.mimetype.startsWith('image/');
    if (isPhoto) {
      next(null, true);
    } else {
      next({ message: "That file type isn't allowed" }, false);
    }
  },
};

exports.homePage = (req, res) => {
  console.log(req.name);
  req.flash('error', 'something happened!');
  req.flash('info', 'something happened!');
  req.flash('warning', 'something happened!');
  req.flash('success', 'something happened!');
  res.render('index');
};

exports.upload = multer(multerOptions).single('photo');

exports.resize = async (req, res, next) => {
  if (!req.file) {
    next(); // skip to the next middleware if there is no file.
    return;
  }
  const extension = req.file.mimetype.split('/')[1];
  req.body.photo = `${uuid.v4()}.${extension}`;
  // now we resize
  const photo = await jimp.read(req.file.buffer);
  await photo.resize(800, jimp.AUTO);
  await photo.write(`./public/uploads/${req.body.photo}`);
  // once we have written the photo to our filesystem, keep going!
  next();
};

exports.getPeople = async (req, res) => {
  // const peoplePromise = Person.find()
  //   .skip(skip)
  //   .limit(limit)
  //   .sort({ created: 'desc' });

  // Fires off both queries at same time, awaits the return of them together (bc one may take longer ??
  // than the other)
  // const people = await Promise.all(peoplePromise);
  res.render('names', {
    title: 'Names',

  });
}