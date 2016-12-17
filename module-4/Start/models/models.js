var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var userSchema = new Schema({
    username: String,
    password: String, //hash created from password
    created_at: { type: Date, default: Date.now }
});

var postSchema = new Schema({
    created_by: { type: ObjectId, ref: 'User' },
    created_at: { type: Date, default: Date.now },
    text: String
});

mongoose.model('Post', postSchema);
mongoose.model('User', userSchema);