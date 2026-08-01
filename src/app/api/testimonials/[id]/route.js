import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/db';
import Testimonial from '../../../../models/Testimonial';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    
    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }
    
    return NextResponse.json(testimonial);
  } catch (error) {
    console.error('Error fetching testimonial:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const data = await request.json();
    
    // Sync avatar and image fields
    if (data.image || data.avatar) {
      const imageUrl = data.image || data.avatar;
      data.avatar = imageUrl;
      data.image = imageUrl;
    }
    
    const testimonial = await Testimonial.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    
    if (!testimonial) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }
    
    return NextResponse.json(testimonial);
  } catch (error) {
    console.error('Error updating testimonial:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    
    const testimonial = await Testimonial.findByIdAndDelete(id);
    
    if (!testimonial) {
      return NextResponse.json({ error: 'Testimonial not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
