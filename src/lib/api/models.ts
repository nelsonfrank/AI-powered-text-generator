const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message'
        }
    ]
});

const messagesSchema = new mongoose.Schema({
    content: {
        type: [String],
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

// Create the User model
const User = mongoose.model('User', userSchema);

// Create the Message model
const Message = mongoose.model('Messages', messagesSchema);

// Export the models
export { User, Message };
