const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const searchGame = require('../utils/searchGameAPI')

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id})
                    .select('-__v -password')
                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },
        searchGame: async(parent, args, context) => {
            // insert query for calling game API, retrieve result,  and then return it to client
            return await searchGame(args.title);
        }
    },
    Mutation: {
        addUser: async(parents, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async(parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials!');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials!');
            }

            const token = signToken(user);
            return { token, user };
        },
        saveGame: async (parent, { input }, context) => {
            if (context.user) {
                const userSavedGame = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedGames: input } },
                    { new: true }
                )
                return userSavedGame;
            }

            throw new AuthenticationError('You need to be logged in!')
        },
        removeGame: async (parent, args, context) => {
            if (context.user) {
                const userDeletedGame = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedGames: { gameId: args.gameId } }},
                    { new: true }
                );
                return userDeletedGame;
            }
        }
    }
}

module.exports = resolvers;