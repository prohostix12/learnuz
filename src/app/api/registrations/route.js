export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/db';
import Registration from '../../../models/Registration';

export async function GET() {
  try {
    await dbConnect();
    const registrations = await Registration.find({}).sort({ createdAt: -1 });
    return NextResponse.json(registrations);
  } catch (error) {
    console.error('Error fetching registrations:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();
    
    if (!data.fullName || !data.email || !data.phone || !data.program || !data.degreeLevel) {
      return NextResponse.json({ error: 'Please provide all required fields.' }, { status: 400 });
    }
    
    const registration = new Registration(data);
    await registration.save();
    return NextResponse.json(registration, { status: 201 });
  } catch (error) {
    console.error('Error saving registration:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
