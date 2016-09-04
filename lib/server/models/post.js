import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true,
    default: new Date()
  },
  content: {
    type: String
  }
});

export default mongoose.model('Post', postSchema);