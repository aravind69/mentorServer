const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const schema= new Schema({
userID:{type: String, required: true},
userName:{type: String,unique: true, required: true},
userType:{type: String, required: true},
email:{type: String, required: true},
phoneNo:{type: Number,unique: true, required: true},
hash: { type: String, required: true },
isdelete: { type: Boolean},
userVerified: { type: Boolean},
createdDate: { type: Date, default: Date.now },
updatedDate: { type: Date, default: Date.now }
});
schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('MentorUsers', schema);