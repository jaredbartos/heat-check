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
    defReb: {
      type: Number,
      required: true,
      min: 0,
      deafult: 0
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
    },
    player: {
      type: Schema.Types.ObjectId,
      ref: 'Player',
      required: true
    },
    date: {
      type: Date
    },
  },
  {
    timestamps: true
  }
);

const Performance = mongoose.model('Performance', performanceSchema);

module.exports = Performance;