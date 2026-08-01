export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/db';
import Testimonial from '../../../models/Testimonial';

const initialTestimonials = [
  {
    name: 'Alexander Wright',
    role: 'Computer Science Graduate',
    country: 'United Kingdom',
    university: 'Oxford Partner Program',
    course: 'MSc Computer Science',
    quote: 'Learnuz allowed me to complete accredited university modules while working full-time. The professors and labs were world-class!',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    rating: 5
  },
  {
    name: 'Sophia Martinez',
    role: 'Data Science Specialist',
    country: 'United States',
    university: 'Stanford Online',
    course: 'MSc Data Science',
    quote: 'The interactive tools and mentorship gave me the practical edge needed to land a top tech role right after graduation.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    rating: 5
  },
  {
    name: 'Marcus Chen',
    role: 'AI Systems Architect',
    country: 'United States',
    university: 'MIT Extension',
    course: 'MSc Artificial Intelligence',
    quote: 'Seamless mobile access and structured credit tracking made my learning journey clear, engaging, and highly rewarding.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    rating: 5
  },
  {
    name: 'Sneha Nair',
    role: 'Student',
    country: 'United Kingdom',
    university: 'Oxford Online / Leeds Beckett University',
    course: 'MSc Computer Science',
    quote: 'Learnuz changed my academic career pathway completely! The 1-on-1 career counselling helped me select the right universities and credits, and their team was there for my application submissions and visa checklists.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400',
    rating: 5
  },
  {
    name: 'Rohan Patel',
    role: 'Alumnus',
    country: 'United States',
    university: 'Stanford Extension / University of Illinois',
    course: 'MSc Data Science',
    quote: 'Excellent counselors! They answered every query about overseas banking, scholarship criteria, and academic eligibility transparently. I successfully received my offer letter and F-1 student visa without issues.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400',
    rating: 5
  },
  {
    name: 'Ananya Rao',
    role: 'Student',
    country: 'Germany',
    university: 'Technical University Munich',
    course: 'MBA Innovation & Management',
    quote: 'Learnuz streamlined my admissions file. Their support team was highly responsive, helping me prepare a compelling Statement of Purpose (SOP) and obtaining a fully-funded DAAD scholarship.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400',
    rating: 5
  },
  {
    name: 'Michael Brown',
    role: 'Alumnus',
    country: 'Canada',
    university: 'University of Toronto',
    course: 'BSc Business Analytics',
    quote: 'Exceptional end-to-end guidance! The team is highly experienced in student visa processing. They conducted mock interviews with me which built my confidence. Strongly recommend Learnuz to anyone studying abroad.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400',
    rating: 5
  },
  {
    name: 'Jessica Lim',
    role: 'Student',
    country: 'Australia',
    university: 'University of Sydney',
    course: 'Master of Information Technology',
    quote: 'I got a 50% tuition fee waiver scholarship through Learnuz! Their team evaluated my GPA, suggested targeted universities, and filed my admissions files efficiently. Their service is truly premium.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400',
    rating: 5
  }
];

export async function GET() {
  try {
    await dbConnect();
    
    let count = await Testimonial.countDocuments();
    if (count === 0) {
      console.log('Seeding initial testimonials...');
      await Testimonial.insertMany(initialTestimonials);
    }
    
    const testimonials = await Testimonial.find({}).sort({ createdAt: -1 });
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();
    
    // Ensure both avatar and image are synced
    const imageUrl = data.image || data.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80';
    data.avatar = imageUrl;
    data.image = imageUrl;
    
    const testimonial = new Testimonial(data);
    await testimonial.save();
    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
