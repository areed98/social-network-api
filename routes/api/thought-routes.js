// Imports
const router = require('express').Router();

//Import thought functions
const {
    getAllthoughts,
    getThoughtbyId,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction,
} = require('../../controllers/thought-controller');

//create routes
router
    .route('/')
    .get(getAllthoughts)
    .post(createThought)

router
    .route('/:id')
    .get(getThoughtbyId)
    .put(updateThought)
    .delete(deleteThought)

router
    .route('/:thoughtId/reactions')
    .post(addReaction)

router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction)

//Export router
module.exports = router;