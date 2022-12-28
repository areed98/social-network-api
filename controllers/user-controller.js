//Imports
const { User } = require('../models');

//Controller functions
const userController = {
    //Get All users
    getAllUsers(req, res) {
        User.find({})
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },

    //Get User by Id
    getUserById({params}, res) {
        User.find(
            { _id: params.id }
        )
        .populate(
            {
                path: 'thoughts',
                select: '-__v'
            }
        )
        .populate(
            {
                path: 'friends',
                select: '-__v'
            }
        )
        .select('-__v')
        .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found!'})
              return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    //Create User
    createUser({body}, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },

    //Update User
    updateUser({params, body}, res) {
        User.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true, runValidators: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.status(400).json(err));
    },

    //Delete User
    deleteUser({params}, res) {
        User.findOneAndDelete(
            { _id: params.id }
        )
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            res.status(400).json(err)
            console.log(err);
        });
    },

    //Create friend
    createFriend({params, body}, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $addToSet: { friends: params.friendId }},
            { new: true, runValidators: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.staus(400).json(err));
    },

    //Delete friend
    deleteFriend({params, body}, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId }},
            { new: true, runValidators: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.staus(400).json(err));
    },

    //Delete ALL users
    deleteAllUsers(req, res) {
        User.deleteMany({})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },
    
};

//Export controller
module.exports = userController;
