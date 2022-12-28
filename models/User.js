// Import
const {Schema, model} = require('mongoose');
const Thought = require('./Thought');

// Schema creation
const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [
                /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                "Please use a valid email address",
            ],
          },
        thoughts: [{ type: Schema.Types.ObjectId, 
            ref: 'Thought'}],
        friends: [{ type: Schema.Types.ObjectId, 
            ref: 'User'}],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

//Virtuals
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

//Model
const User = model('User', UserSchema);
//Export
module.exports = User;