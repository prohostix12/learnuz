import mongoose from 'mongoose';

const ProgramSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
    enum: ['Undergraduate', 'Postgraduate', 'Diploma', 'Certificate'],
  },
  title: {
    type: String,
    required: true,
  },
  university: {
    type: String,
    required: true, // Stores the name of the university it belongs to
  },
  accreditation: {
    type: String,
    default: 'NAAC A+',
  },
  duration: {
    type: String,
    required: true, // e.g. "3 Years"
  },
  semesters: {
    type: String,
    required: true, // e.g. "6 Semesters"
  },
  fee: {
    type: String,
    required: true, // e.g. "₹23,250"
  },
  emi: {
    type: String,
    default: 'N/A', // e.g. "₹3,875/mo"
  },
  featured: {
    type: Boolean,
    default: false,
  },
  category: {
    type: String,
    required: true, // e.g. "Computer Science", "Commerce", "Management"
  },
  syllabus: {
    type: [String],
    default: [],
  },
  careers: {
    type: [String],
    default: [],
  }
}, { timestamps: true });

export default mongoose.models.Program || mongoose.model('Program', ProgramSchema);
