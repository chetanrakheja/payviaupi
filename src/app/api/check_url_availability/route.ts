import dbConnect from '@/lib/dbConnect';
import linksData from '@/models/linkmodels';
import { NextResponse } from 'next/server'
const reservedLinks=['create','api','check_url_availability',
    'createlink','test','_error','favicon.ico',
    'robots.txt','sitemap.xml','sitemap.xml.gz',
    'sitemap','sitemapindex.xml','sitemapindex.xml.gz','sitemapindex','admin',
    'dashboard','login','register','logout',
    'forgot-password','reset-password','verify-email','profile',
    'settings','users','users','about-us','our-team','contact-us','privacy-policy','']

type Params = {
    upi_link: string
      }

    //   code to nadle api as 
//     curl --location --request POST 'http://localhost:3000/api/check_url_availability' \
// --header 'Content-Type: application/json' \
// --data-raw '{"upi_link":"chetanrakheja22"}'

export async function POST(request: Request) {

    const body = JSON.parse(await request.text());
    // console.log(body);
    let upi_link = body.upi_link;
    // console.log(upi_link);

    try {
        await dbConnect()
        upi_link = upi_link.trim().toLowerCase();
        if (reservedLinks.includes(upi_link)) {
            return NextResponse.json({"isAvailable":false}, { status: 200 })
            
        }

        let linkvar = await linksData.findOne({ upi_link });
        if (linkvar) {
            return NextResponse.json({"isAvailable":false}, { status: 200 })
        }
        return NextResponse.json({"isAvailable":true}, { status: 200 })

    }catch (err) {
        console.log(err);
        return NextResponse.json({"isAvailable":false}, { status: 200 })
    }
}
  