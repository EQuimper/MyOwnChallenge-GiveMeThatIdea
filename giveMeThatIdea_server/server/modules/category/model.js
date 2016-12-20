import mongoose, { Schema } from 'mongoose';

const CategorySchema = new Schema({
  name: { type: String, required: true, trim: true, unique: true },
  ideas: [{ type: Schema.Types.ObjectId, ref: 'Idea' }]
});

export default mongoose.model('Category', CategorySchema);
