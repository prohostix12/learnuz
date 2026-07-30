import mongoose from 'mongoose';

const UniversitySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  shortName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  reviewsCount: {
    type: Number,
    default: 100,
  },
  naacGrade: {
    type: String,
    default: 'NAAC A+',
  },
  nirfRank: {
    type: String,
    default: 'N/A',
  },
  ugcApproved: {
    type: Boolean,
    default: true,
  },
  established: {
    type: Number,
    required: true,
  },
  programsCount: {
    type: Number,
    default: 0,
  },
  studentsCount: {
    type: String,
    default: '5K+',
  },
  feeRange: {
    type: String,
    default: '₹20K - ₹1.5L',
  },
  minFee: {
    type: Number,
    default: 20000,
  },
  maxFee: {
    type: Number,
    default: 150000,
  },
  type: {
    type: String,
    enum: ['Central', 'State', 'Private', 'Deemed'],
    default: 'Private',
  },
  featured: {
    type: Boolean,
    default: false,
  },
  coverImage: {
    type: String,
    default: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=800&auto=format&fit=crop',
  },
  logo: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  }
}, { timestamps: true });

// Prevent mongoose from compiling model again if it's already compiled
export default mongoose.models.University || mongoose.model('University', UniversitySchema);
