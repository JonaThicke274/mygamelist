const { Schema, model } = require('mongoose');
const bcryptjs = require('bcryptjs');

// Import schema for a Game.js or something; needs to be created first
const gameSchema = require();

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			match: [/.+@.+\..+/, 'Must use a valid email address'],
		},
		password: {
			type: String,
			required: true,
		},
		savedGames: [gameSchema]
	},
	{
		toJSON: {
			virtuals: true,
		},
	}
);

// hash user password
userSchema.pre('save', async function (next) {
	if (this.isNew || this.isModified('password')) {
		const saltRounds = 10;
		this.password = await bcryptjs.hash(this.password, saltRounds);
	}

	next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  	return bcryptjs.compare(password, this.password);
};

// create virtual for amount/count of video game saved BELOW

const User = model('User', userSchema);

module.exports = User;
