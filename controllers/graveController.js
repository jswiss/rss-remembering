const mongoose = require('mongoose');
const Grave = mongoose.model('Grave');

exports.getGraves = async (req, res) => {
  await res.render('graves', { title: 'Graves' });
}