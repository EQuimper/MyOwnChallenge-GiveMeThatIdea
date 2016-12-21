import mongoose, { Schema } from 'mongoose';

const CommentSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  idea: {
    type: Schema.Types.ObjectId,
    ref: 'Idea',
    required: true
  }
}, { timestamps: true });

export default mongoose.model('Comment', CommentSchema);
