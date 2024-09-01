import dbConnect from '@/lib/dbConnect';
import linksData from '@/models/linkmodels';
import { NextResponse } from 'next/server'

function validate_upi_id(value: string) {
    const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/;
    return upiRegex.test(value);
}
  
export async function POST(request: Request) {

    // const body = JSON.parse(await request.text());
    // console.log(body);
    // let upi_id = body.upi_id;
    
  let { name,amount_list,upi_id,btn_txt,minAmount,transactionNote,upi_link,username } = JSON.parse(await request.text());
//   console.log(name,amount_list,upi_id,btn_txt,minAmount,transactionNote,upi_link);
//   console.log("name = ", name);
//     console.log("amount_list = ", amount_list);
//     console.log("upi_id = ", upi_id);
//     console.log("btn_txt = ", btn_txt);
//     console.log("minAmount = ", minAmount);
//     console.log("transactionNote = ", transactionNote);
//     console.log("upi_link = ", upi_link);
    
  // await connectDB()

  if (validate_upi_id(upi_id)) {
    try {
        await dbConnect()
      upi_link = upi_link.trim().toLowerCase()
      let linkvar = await linksData.findOne({ upi_link });
      console.log("linkvar = ", linkvar);
      if (linkvar) {
        return NextResponse.json(linkvar, { status: 200 })
        
      } else {
        linkvar = new linksData({name,amount_list,upi_id,btn_txt,minAmount,transactionNote,upi_link,
        created_date: new Date(),
          upi_qr_data :`upi://pay?cu=INR` +
                        `&pa=${upi_id}` +
                        `${name ? `&pn=${encodeURIComponent(name)}` : ''}` +
                        `${minAmount ? `&mam=${String(minAmount)}` : ''}` +
                        `${transactionNote ? `&tn=${String(transactionNote)}` : ''}`
        });

        await linkvar.save();
        
        return NextResponse.json(linkvar, { status: 200 })
      }
    } catch (err) {
      console.log(err);
      return NextResponse.json({message:"Server Error"}, { status: 500 })
    }
  } else {
    return NextResponse.json({message:"UPI Link already in use"}, { status: 400 })
  }
}