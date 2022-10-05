const { Thought, User } = require('../models');

const thoughtsController = {

    newThought({ body }, res) {
        Thought.create(body)
          .then(data => {
            return User.findOneAndUpdate({_id: body.userId }, { $push: { thoughts: data._id } },{ new: true });})
          .then(data => {
            console.log(data);
            if (!data) {
              res.status(404).json({ message: 'User Not found, Please enter the right ID' });
              return;
            }
            res.json(data);
          })
          .catch(err => res.status(404).json(err));
      },


  getThoughts(req, res) {
    Thought.find({}).select('-__v').sort({ _id: -1 })
      .then(data => res.json(data))
      .catch(err => res.status(404).json(err));
  },

  
  getThoughtById({params}, res) {
    Thought.findOne({_id: params.id}).populate({path: 'reactions',select: '-__v'}).select('-__v')
      .then(data => {
        console.log(data)
        res.json(data)
      })
      .catch(err => res.status(404).json(err));
  },
  updateThought({params, body}, res) {
    console.log(params)
    Thought.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
      .then(data => {
        if (!data) {
          res.status(404).json({ message: 'Cannot update the Thoght' });
          return;
        }
        res.json(data);
      })
      .catch(err => res.status(404).json(err));
  },


  deleteThought({params}, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then(data => {
        if (!data) {
          res.status(404).json({ message: 'Cannot Delete the Thought' });
          return;
        }
        res.json({ message: 'Thought Deteled.' });
      })
      .catch(err => res.status(404).json(err));
  },


  newReaction({params, body}, res) {
    console.log(params);
    console.log(body)
    Thought.findOneAndUpdate({_id: params.thoughtId},{$push: {reactions: body}},{new: true, runValidators: true})
      .then(data => {
        if (!data) {
          res.status(404).json({ message: 'User not Founded' });
          return;
        }
        res.json(data);
      })
      .catch(err => res.status(404).json(err));
  },

  
  deleteReaction({params}, res) {
    console.log(params)
    Thought.findOneAndUpdate({_id: params.thoughtId},{$pull: {reactions: {reactionId: params.reactionId} }}, {new: true})
    .then(data => res.json([{message:`Reaction Deleted:`},data]))
      .catch(err => res.status(404).json(err));
  }
};

module.exports = thoughtsController;