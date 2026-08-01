import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    default: '',
  },
  university: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    default: '',
  },
  rating: {
    type: Number,
    default: 5,
    min: 1,
    max: 5,
  },
  quote: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: '',
  }
}, { timestamps: true });

export default mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);
