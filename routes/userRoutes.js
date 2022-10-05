const router = require('express').Router();
const {getUsers, getUserID, createUser, updateUser, deleteUser, addFriends, deleteFriend} = require('../../controllers/users');

//Get and Create New Users
router.route('/users').get(getUsers).post(createUser)

//Get Delete and Update
router.route('/users/:id').get(getUserID).delete(deleteUser).put(updateUser)

//Post and Delete by ID
router.route('/users/:userId/friends/:friendId').post(addFriends).delete(deleteFriend)

module.exports = router; 