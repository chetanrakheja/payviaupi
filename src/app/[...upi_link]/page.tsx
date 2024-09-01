"use client";
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';
import { PayComponent } from '@/components/PayComponent';


export default function Page({ params }: { params: { upi_link: string } }) {
  const searchParams = useSearchParams();

  // Decoding the upi_link from params
  const upi_link = decodeURIComponent(params.upi_link);
  const { props: { link_model_var } = {} } = processData(params, searchParams);

  return (
    <main className="main">
          <PayComponent pn={link_model_var?.name} 
                      amount_list={link_model_var?.amount_list} 
                      upiid={link_model_var?.upi_id} 
                      btnText={link_model_var?.btnText} 
                      minAmount={link_model_var?.minAmount}
                      transactionNote={link_model_var?.transactionNote}/>
          </main>
  );
}


function processData(params: { upi_link: any; },searchParams: ReadonlyURLSearchParams) {
  try {
    // const { link } = context.params;
    const upi_link = decodeURIComponent(params.upi_link); 
    if(upi_link.includes("@")){
        var link_model_var_local = {
          name: (searchParams.get('pn')? searchParams.get('pn') : searchParams.get('upi_link')),
          amount_list: (searchParams.get('amount_list')? searchParams.get('amount_list') : ""),
          upi_id: upi_link,
          minAmount: (searchParams.get('mam')? searchParams.get('mam') : ""),
          btnText: (searchParams.get('btnText')? searchParams.get('btnText') : "Pay Now"),
          upi_link: (searchParams.get('upi_link')? searchParams.get('upi_link') : ""),
          transactionNote: (searchParams.get('tn')? searchParams.get('tn') : "PayViaUPI"),
        }  
      return {
          props: {
            link_model_var: link_model_var_local,
          },
        };

      }
    // await connectDB();
    // const link_model_var = await link_model.findOneAndUpdate(
    //         { upi_link },
    //         { $inc: { clicks: 1 } },
    //         { new: true }
    //       );
    // await disconnectDB();
    // if (link_model_var) {

    //   // Convert the Mongoose document to a plain JavaScript object and exclude the _id field
    //   const linkDataObject = link_model_var.toObject({ transform: (doc, ret) => {
    //     delete ret._id;
    //     return ret;
    //   }});
    //   return {
    //     props: {
    //       link_model_var: linkDataObject,
    //     },
    //   };
    // } 
    // else {
      return {
        notFound: true,
      };
    // }
  } catch (error) {
    console.error(error);
    return {
      props: {
        link_model_var: null,
      },
    };
  }
}