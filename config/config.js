const mongoose = require('mongoose');

// Set up connection to SocialNetwork database
const connectionURI = 'mongodb://localhost:27017/SocialNetworDatabase'

mongoose.connect(connectionURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

module.exports = mongoose.connection;