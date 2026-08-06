export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/db';
import ContactDetails from '../../../models/ContactDetails';

export async function GET() {
  try {
    await dbConnect();
    let details = await ContactDetails.findOne({});
    if (!details) {
      details = new ContactDetails({
        phone: '+91 98765 43210',
        phoneLabel: 'Call Us',
        phoneDesc: 'Direct connect to student support team',
        email: 'support@learnuz.com',
        emailLabel: 'Email Us',
        emailDesc: '2-4 hour response time for active tickets',
        hqTitle: 'Kochi, Kerala',
        hqAddress: 'Learnuz Hub, Ground Floor, Infopark Phase 1, Kakkanad, Kochi, Kerala, India - 682030',
        workingHours: 'Mon - Sat: 9AM - 6PM IST',
        workingHoursDesc: 'Emergency support desk available on Sunday'
      });
      await details.save();
    }
    return NextResponse.json(details);
  } catch (error) {
    console.error('Error fetching contact details:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();
    
    let details = await ContactDetails.findOne({});
    if (details) {
      details.phone = data.phone !== undefined ? data.phone : details.phone;
      details.phoneLabel = data.phoneLabel !== undefined ? data.phoneLabel : details.phoneLabel;
      details.phoneDesc = data.phoneDesc !== undefined ? data.phoneDesc : details.phoneDesc;
      details.email = data.email !== undefined ? data.email : details.email;
      details.emailLabel = data.emailLabel !== undefined ? data.emailLabel : details.emailLabel;
      details.emailDesc = data.emailDesc !== undefined ? data.emailDesc : details.emailDesc;
      details.hqTitle = data.hqTitle !== undefined ? data.hqTitle : details.hqTitle;
      details.hqAddress = data.hqAddress !== undefined ? data.hqAddress : details.hqAddress;
      details.workingHours = data.workingHours !== undefined ? data.workingHours : details.workingHours;
      details.workingHoursDesc = data.workingHoursDesc !== undefined ? data.workingHoursDesc : details.workingHoursDesc;
      await details.save();
    } else {
      details = new ContactDetails(data);
      await details.save();
    }
    
    return NextResponse.json(details);
  } catch (error) {
    console.error('Error saving contact details:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
