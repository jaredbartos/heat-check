const mongoose = require('mongoose');

const { Schema } = mongoose;

const teamSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    league: {
      type: Schema.Types.ObjectId,
      ref: 'League'
    },
    players: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Player'
      }
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
