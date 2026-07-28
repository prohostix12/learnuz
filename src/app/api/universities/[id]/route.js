import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/db';
import University from '../../../../models/University';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    
    // Find by the custom string id field (not mongo _id)
    const university = await University.findOne({ id });
    
    if (!university) {
      return NextResponse.json({ error: 'University not found' }, { status: 404 });
    }
    
    return NextResponse.json(university);
  } catch (error) {
    console.error('Error fetching university:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const data = await request.json();
    
    // Find by the custom string id field (not mongo _id)
    const university = await University.findOneAndUpdate({ id }, data, { new: true, runValidators: true });
    
    if (!university) {
      return NextResponse.json({ error: 'University not found' }, { status: 404 });
    }
    
    return NextResponse.json(university);
  } catch (error) {
    console.error('Error updating university:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    
    const university = await University.findOneAndDelete({ id });
    
    if (!university) {
      return NextResponse.json({ error: 'University not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'University deleted successfully' });
  } catch (error) {
    console.error('Error deleting university:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
