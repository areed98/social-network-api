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
    deleteAllThoughts,
} = require('../../controllers/thought-controller');

//create routes
router
    .route('/')
    .get(getAllthoughts)
    .post(createThought)
    .delete(deleteAllThoughts)
//by id route
router
    .route('/:id')
    .get(getThoughtbyId)
    .put(updateThought)
    .delete(deleteThought)
//create reaction route
router
    .route('/:thoughtId/reactions')
    .post(createReaction)
//delete reaction route
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction)

//Export router
module.exports = router;