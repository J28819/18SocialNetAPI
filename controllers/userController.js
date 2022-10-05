const { User, Thought } = require ('../models');


const usersController = {
    createUser({ body }, res){
        User.create(body)
        .then(data => res.json(data))
        .catch(err => res.json(err));
    },

    getUsers(req, res) {
        User.find({}).populate({path: 'friends',select: '-__v'}).populate({path: 'thoughts',select: '-__v'}).select('-__v')
        .then(data => res.status(200).json(data))
        .catch(err => {
            res.sendStatus(400);
        });
    },
    updateUser({params, body} , res) {
        User.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .then(data =>{
            if (!data) {res.status(404).json({message: 'Invalid ID'});
                return;
            }
            res.json(data);
        })
        .catch(err => res.status(400).json(err));
    },

    deleteUser({params}, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(data => res.json([{message:`Friend Deleted:`},data]))
          .catch(err =>res.sendStatus(400).json({message:`Cannot update the user:  ${err}` }));
      },

    getUserID ({params}, res) {
        User.findOne ({_id: params.id }).populate({path: 'thoughts', select: '-__v'}).select('-__v')
        .then(data => res.json(data))
        .catch(err =>res.sendStatus(400).json({message:`Cannot get the user by ID:  ${err}` }));
    },
    addFriends ({params}, res) {
        User.findOneAndUpdate({_id: params.userId}, {$push: { friends: params.friendId}}, {new: true})
        .then(data => res.json([{message:`Friend added:`},data]))
        .catch(err =>res.sendStatus(400).json({message:`Cannot add the new friend Error:  ${err}` }));
      },
    
    deleteFriend({params}, res) {
        User.findOneAndUpdate({_id:params.userId}, {$pull: { friends: params.friendId}}, {new: true})
        .then(data => res.json([{message:`Friend Deleted:`},data]))
        .catch(err =>res.sendStatus(400).json({message:`Error: trying to Delete:  ${err}` }));
      }
};

module.exports = usersController;