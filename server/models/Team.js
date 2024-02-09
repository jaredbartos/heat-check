const mongoose = require('mongoose');

const { Schema } = mongoose;

const teamSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    league: {
      type: String
    },
    players: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Player'
      }
    ],
  },
  {
    timestamps: true
  }
);

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;