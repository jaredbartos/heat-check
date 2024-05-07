const mongoose = require('mongoose');

const { Schema } = mongoose;

const leagueSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  teams: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Team'
    }
  ]
});

const League = mongoose.model('League', leagueSchema);

module.exports = League;
