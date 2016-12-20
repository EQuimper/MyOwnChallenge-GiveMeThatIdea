import mongoose, { Schema } from 'mongoose';

const IdeaSchema = new Schema({
  title: {
    type: String,
    unique: true,
    trim: true,
    minLength: [4, 'You need at least 4 charaters for be a valid title'],
    required: true
  },
  description: {
    type: String,
    minLength: [30, 'You need 30 charaters'],
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  }
});

export default mongoose.model('Idea', IdeaSchema);
