const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

const ReactionSchema = new Schema(
    {
    reactionId: {type: Schema.Types.ObjectId, default: () => new Types.ObjectId()},
    responseBody: {type: String,  maxlength: 280,  required: true},
    username: {type: String,require: true},
    createdAt: {type: Date, default: Date.now, get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')}
},
{
    toJSON: {
        getters: true
    }
}
);
const ThoughtSchema = new Schema(
    {
        thoughtText: {type: String, minlegnth: 1, maxlength: 280, required: true},
        username: {type: String, require: true},
        createdAt:{type: Date, default: Date.now, get:  createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')}, 
        reactions: {type: String, required: true},
        reactions: [ReactionSchema]
    },
    {
        toJSON:{virtuals: true, getters: true}, 
        id: false
    }
);

ThoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});


const Thought = model('Thought', ThoughtSchema);
module.exports = Thought; 