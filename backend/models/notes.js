const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const notesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true,
    // unique: true
  },
 
});

// BooksSchema.methods.comparePassword = function(candidatePassword) {
//   return bcrypt.compare(candidatePassword, this.password);
// };
const notes = mongoose.model('notes', notesSchema);

module.exports = notes;