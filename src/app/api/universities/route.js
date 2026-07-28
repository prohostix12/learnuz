export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/db';
import University from '../../../models/University';
import { universities as initialUniversities } from '../../../data/universities';

export async function GET() {
  try {
    await dbConnect();
    
    let count = await University.countDocuments();
    if (count === 0) {
      // Seed initial universities
      console.log('Seeding initial universities...');
      await University.insertMany(initialUniversities);
    }
    
    const universities = await University.find({}).sort({ featured: -1, rating: -1 });
    return NextResponse.json(universities);
  } catch (error) {
    console.error('Error fetching universities:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();
    
    // Auto-generate an ID if not provided
    if (!data.id) {
      data.id = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }
    
    // Quick validation
    const existing = await University.findOne({ id: data.id });
    if (existing) {
      return NextResponse.json({ error: `University with ID "${data.id}" already exists.` }, { status: 400 });
    }
    
    const university = new University(data);
    await university.save();
    return NextResponse.json(university, { status: 201 });
  } catch (error) {
    console.error('Error creating university:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
