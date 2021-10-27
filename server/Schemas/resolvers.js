
const { AuthenticationError } = require('apollo-server-express');
const { Stock, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        user: async (parent, args, context) => {
            console.log(context.user);
            if (context.user) {
                try {
                    const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    console.log("userData:", userData);
                    return userData
                } catch(err) {
                    console.log(err);
                }
                
                
            }
            throw new AuthenticationError('Not logged in');
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPW = await user.isCorrectPassword(password);

            if (!correctPW) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);
            return { token, user };
        },
        saveStock: async (parent, { stock }, context) => {
            if (context.user) {
                const updateUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedStocks: stock } },
                    { new: true }
                )
                return updateUser;
            }
            throw new AuthenticationError('You need to be logged in');
        },
        removeStock: async (parent, { stockId }, context) => {
            if (context.user) {
                const updateUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedStocks: { stockId: stockId } } },
                    { new: true }
                )
                return updateUser;
            }
            throw new AuthenticationError('You need to be logged in')
        }
    }
};

module.exports = resolvers;