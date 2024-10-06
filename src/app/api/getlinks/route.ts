import dbConnect from '@/lib/dbConnect';
import linksData from '@/models/linkmodels';
import { NextResponse } from 'next/server'

  
export async function POST(request: Request) {

    // const body = JSON.parse(await request.text());
    // console.log(body);
    // let upi_id = body.upi_id;
    
  let { session } = JSON.parse(await request.text());

    
  // await connectDB()
    try {
        await dbConnect()
        // get links where userEmail and userId matches
        
        let linkvar = await linksData.find({ userEmail: session?.user?.email }).lean();

          if (linkvar) {
            return NextResponse.json(linkvar, { status: 200 })
          } else {
            return NextResponse.json([], { status: 200 })
          }
        }
      
    catch (err) {
      console.log(err);
      return NextResponse.json({message:"Server Error"}, { status: 500 })
    }
  } 
