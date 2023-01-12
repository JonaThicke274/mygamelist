const { Schema } = require ('mongoose');

const gameSchema = new Schema({
    gameId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    description: {
        type: String,
        required: true,
    },
    link: {
        type: String,
    }
});