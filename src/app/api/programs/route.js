export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/db';
import Program from '../../../models/Program';
import { initialPrograms } from '../../../data/programs';

export async function GET() {
  try {
    await dbConnect();
    
    let count = await Program.countDocuments();
    if (count === 0) {
      // Seed initial programs
      console.log('Seeding initial programs...');
      await Program.insertMany(initialPrograms);
    }
    
    const programs = await Program.find({});
    return NextResponse.json(programs);
  } catch (error) {
    console.error('Error fetching programs:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();
    
    // Quick validation
    if (!data.title || !data.university || !data.code || !data.level) {
      return NextResponse.json({ error: 'Title, University, Code, and Level are required.' }, { status: 400 });
    }
    
    const program = new Program(data);
    await program.save();
    return NextResponse.json(program, { status: 201 });
  } catch (error) {
    console.error('Error creating program:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
