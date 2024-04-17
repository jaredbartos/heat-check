const mongoose = require('mongoose');

const { Schema } = mongoose;

const teamSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    league: {
      type: String,
      required: true
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
