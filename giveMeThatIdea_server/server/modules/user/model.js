import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { isEmail } from 'validator';

const UserSchema = new Schema({
  local: {
    email: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      validate: [isEmail, 'You must provided a valid email!']
    },
    password: {
      type: String,
      trim: true
    }
  },
  username: {
    type: String,
    unique: true,
    trim: true,
    minLength: [4, 'Username too short']
  },
  role: {
    type: String,
    enum: ['Member', 'Admin'],
    default: 'Member'
  },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date }
}, { timestamps: true });

// pre save
UserSchema.pre('save', function(next) {
  // check if it's new password or update one so we don't touch it
  if (!this.isModified('local.password')) { return next(); }
  // number of round for salt
  const SALT_ROUNDS = 10;
  // hash the password
  bcrypt.hash(this.local.password, SALT_ROUNDS, (err, hash) => {
    if (err) { return next(err); }
    // make the local.password the result of the hash
    this.local.password = hash;
    next();
  });
});

// method for comapre password
UserSchema.methods.comparePassword = function(canditePassword, cb) {
  // compare the password from the front-end and check if match the crypt one
  bcrypt.compare(canditePassword, this.local.password, (err, isMatch) => {
    if (err) { return cb(err); }
    // return no error and the match if this is good
    cb(null, isMatch);
  });
};

export default mongoose.model('User', UserSchema);
