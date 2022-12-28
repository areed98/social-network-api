//Imports
const { User, Thought } = require('../models');

//Controller functions
const thoughtController = {
    //get all thoughts
    getAllthoughts(req, res) {
        Thought.find({})
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.status(400).json(err));
    },
    //get thought by ID
    getThoughtbyId({params}, res) {
        Thought.find(
            { _id: params.id }
        )
        .populate(
            {
                path: 'reactions',
                select: '-__v',
            },
        )
        .select('-__v')
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found'})
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    //Create New Thought
    createThought({body}, res) {
        Thought.create(body)
        .then(({ _id, username }) => {
            return User.findOneAndUpdate(
                { username: username },
                { $push: { thoughts: _id } },
                { new: true },
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(400).json({ message: "No user found!" });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    //Update thought by id
    updateThought({params, body}, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            body,
            { new: true, runValidators: true }
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found!'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },

    //Delete thought by id
    deleteThought({params}, res) {
        Thought.findOneAndDelete(
            { _id: params.id }
          )
          .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No thought found!' });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.status(400).json(err));
    },

    //Create Reaction
    createReaction({params, body}, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body }},
            { new: true, runValidators: true }
          )
          .then(dbThoughtData => {
            if(!dbThoughtData) {
              res.status(404).json({message: 'No thought found!'});
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.json(err));
    },

    //Delete Reaction
    deleteReaction({params}, res) {
        Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $pull: { reactions: { reactionId: params.reactionId }}},
          { new: true }
        )
        .then(dbThoughtData => {
          if(!dbThoughtData) {
            return res.status(404).json({message: "No thought or reaction found!"});
          }
          res.json(dbThoughtData)
        })
        .catch(err => res.json(err));
    },

    //Delete all thoughts
    deleteAllThoughts(req, res) {
        Thought.deleteMany({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.status(400).json(err));
    },
    
};

//Export controller
module.exports = thoughtController;