import mongoose from 'mongoose';

const RegistrationSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  program: {
    type: String,
    required: true,
  },
  degreeLevel: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['new', 'reviewed', 'contacted', 'enrolled'],
    default: 'new',
  }
}, { timestamps: true });

export default mongoose.models.Registration || mongoose.model('Registration', RegistrationSchema);
