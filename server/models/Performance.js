const mongoose = require('mongoose');

const { Schema } = mongoose;

const performanceSchema = new Schema(
  {
    fgAtt: {
      type: Number,
      required: true,
      min: 0,
      default: 0
    },
    fgMade: {
      type: Number,
      required: true,
      min: 0,
      default: 0
    },
    threePtAtt: {
      type: Number,
      required: true,
      min: 0,
      default: 0
    },
    threePtMade: {
      type: Number,
      required: true,
      min: 0,
      default: 0
    },
    ftAtt: {
      type: Number,
      required: true,
      min: 0,
      default: 0
    },
    ftMade: {
      type: Number,
      required: true,
      min: 0,
      default: 0
    },
    offReb: {
      type: Number,
      required: true,
      min: 0,
      default: 0
    },
    rebounds: {
      type: Number,
      required: true,
      min: 0,
      default: 0
    },
    assists: {
      type: Number,
      required: true,
      min: 0,
      default: 0
    },
    steals: {
      type: Number,
      required: true,
      min: 0,
      default: 0
    },
    blocks: {
      type: Number,
      required: true,
      min: 0,
      default: 0
    },
    turnovers: {
      type: Number,
      required: true,
      min: 0,
      default: 0
    },
    points: {
      type: Number,
      required: true,
      default: 0
    },
    player: {
      type: Schema.Types.ObjectId,
      ref: 'Player',
      required: true
    },
    date: {
      type: Date,
      required: true,
      set: timestamp => new Date(timestamp)
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    toJSON: {
      getters: true
    },
    timestamps: true
  }
);

const Performance = mongoose.model('Performance', performanceSchema);

module.exports = Performance;
