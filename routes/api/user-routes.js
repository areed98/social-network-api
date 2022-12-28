//Imports
const router = require('express').Router();

//Import user functions
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    createFriend,
    deleteFriend,
    deleteAllUsers,
} = require('../../controllers/user-controller');

//Create Routes
router
    .route('/')
    .get(getAllUsers)
    .post(createUser)
    .delete(deleteAllUsers)
//by user routes
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)
//friend routes
router
    .route('/:userId/friends/:friendId')
    .post(createFriend)
    .delete(deleteFriend)

//Export Router
module.exports = router;