import mongoose, { Schema } from 'mongoose';

const IdeaSchema = new Schema({
  title: {
    type: String,
    unique: true,
    trim: true,
    minLength: [3, 'You need at least 3 charaters for be a valid title'],
    required: true
  },
  description: {
    type: String,
    minLength: [5, 'You need 5 charaters'],
    required: true
  },
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

export default mongoose.model('Idea', IdeaSchema);
