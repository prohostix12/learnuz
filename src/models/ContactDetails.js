import mongoose from 'mongoose';

const ContactDetailsSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    default: '+91 98765 43210'
  },
  phoneLabel: {
    type: String,
    default: 'Call Us'
  },
  phoneDesc: {
    type: String,
    default: 'Direct connect to student support team'
  },
  email: {
    type: String,
    required: true,
    default: 'support@learnuz.com'
  },
  emailLabel: {
    type: String,
    default: 'Email Us'
  },
  emailDesc: {
    type: String,
    default: '2-4 hour response time for active tickets'
  },
  hqTitle: {
    type: String,
    default: 'Kochi, Kerala'
  },
  hqAddress: {
    type: String,
    default: 'Learnuz Hub, Ground Floor, Infopark Phase 1, Kakkanad, Kochi, Kerala, India - 682030'
  },
  workingHours: {
    type: String,
    default: 'Mon - Sat: 9AM - 6PM IST'
  },
  workingHoursDesc: {
    type: String,
    default: 'Emergency support desk available on Sunday'
  }
}, { timestamps: true });

export default mongoose.models.ContactDetails || mongoose.model('ContactDetails', ContactDetailsSchema);
