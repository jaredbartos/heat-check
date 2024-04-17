const mongoose = require('mongoose');

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
			type: String
		},
		number: {
			type: Number,
			min: 0,
			max: 99
		},
		height: {
			type: String
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
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		}
	},
	{
		timestamps: true
	}
);

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
