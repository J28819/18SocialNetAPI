const router = require('express').Router();
const {getThoughts, getThoughtById, newThought, updateThought, deleteThought, newReaction, deleteReaction} = require('../../controllers/thought') 

//Get All Elements 
router.route('/thoughts').get(getThoughts).post(newThought)

// CRUD by ID
router.route('/thoughts/:id').get(getThoughtById).delete(deleteThought).put(updateThought)

//Adding elements 
router.route('/thoughts/:thoughtId/reactions').post(newReaction)

// Delete reaction for thoughts
router.route('/thoughts/:thoughtId/reactions/:reactionId').delete(deleteReaction)

module.exports = router; 