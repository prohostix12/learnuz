import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/db';
import Program from '../../../../models/Program';

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const data = await request.json();
    
    const program = await Program.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    
    if (!program) {
      return NextResponse.json({ error: 'Program not found' }, { status: 404 });
    }
    
    return NextResponse.json(program);
  } catch (error) {
    console.error('Error updating program:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    
    const program = await Program.findByIdAndDelete(id);
    
    if (!program) {
      return NextResponse.json({ error: 'Program not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Program deleted successfully' });
  } catch (error) {
    console.error('Error deleting program:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
