const mongoose = require('mongoose');
const { formatHeight } = require('../utils/getters');

const { Schema } = mongoose;

const playerSchema = new Schema(
  {
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
      get: formatHeight
    },
    weight: {
      type: Number
    },
    team: {
      type: Schema.Types.ObjectId,
      ref: 'Team'
    },
    performances: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Performance'
      }
    ],
  },
  {
    toJSON: {
      getters: true
    },
    timestamps: true
  }
);

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;