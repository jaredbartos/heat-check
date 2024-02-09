const mongoose = require('mongoose');

const { Schema } = mongoose;

const playerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  position: {
    type: String,
    default: 'All'
  },
  number: {
    type: Number,
    min: 0,
    max: 99
  },
  height: {
    type: Number,
  },
  weight: {
    type: Number
  },
  performances: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Performance'
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;