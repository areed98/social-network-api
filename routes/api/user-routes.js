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
} = require('../../controllers/user-controller');

//Create Routes
router
    .route('/')
    .get(getAllUsers)
    .post(createUser)

router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

router
    .route('/userId/friends/:friendId')
    .post(createFriend)
    .delete(deleteFriend)

//Export Router
module.exports = router;