import dbConnect from '@/lib/dbConnect';
import linksData from '@/models/linkmodels';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next'; // Use this for server-side session

export async function DELETE(request: Request) {
    try {
      let { upi_link,userEmail,session } = JSON.parse(await request.text());
      // console.log("upi_link = ", upi_link);
      // console.log("userEmail = ", userEmail);
      // console.log("session = ", session);

        // Check if session is valid and extract user email
      

        if (!userEmail || !session || userEmail != session?.user?.email) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        if (!upi_link) {
            return NextResponse.json({ message: 'UPI link is required' }, { status: 400 });
        }

        await dbConnect();

        // Find the link and verify that the requesting user is the creator
        const linkRecord = await linksData
        .findOne({ upi_link: upi_link.trim().toLowerCase(), 
                    userEmail: userEmail });

        if (!linkRecord) {
            return NextResponse.json({ message: 'Link not found' }, { status: 404 });
        }

        if (linkRecord.userEmail !== userEmail) {
            return NextResponse.json({ message: 'Unauthorized to delete this link' }, { status: 403 });
        }

        // Proceed with deletion
        await linksData.deleteOne({ _id: linkRecord._id });

        return NextResponse.json({ message: 'Link deleted successfully' }, { status: 200 });

    } catch (error) {
        console.error('Error deleting link:', error);
        return NextResponse.json({ message: 'Server error' }, { status: 500 });
    }
}
