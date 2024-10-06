import dbConnect from '@/lib/dbConnect';
import linksData from '@/models/linkmodels';
import { PayComponent } from '@/components/PayComponent';
import Link from 'next/link';


// Ignore ts error

export default async function Page({ params, searchParams }: { params: any, searchParams: any }) {
  await dbConnect();

  const upi_link = decodeURIComponent(params.upi_link as string);
  let amount_list = decodeURIComponent(params.amount_list as string);
  let link_model_var = null;

  try {
    if (upi_link.includes('@')) {
      link_model_var = {
        name: searchParams.pn || searchParams.upi_link || '',
        amount_list: amount_list || searchParams.amount_list || '',
        upi_id: upi_link,
        minAmount: searchParams.mam || '',
        btnText: searchParams.btnText || 'Pay Now',
        upi_link: searchParams.upi_link || '',
        transactionNote: searchParams.tn || 'PayViaUPI',
      };
    } else {
      link_model_var = await linksData.findOneAndUpdate(
        { upi_link },
        { $inc: { clicks: 1 } },
        { new: true }
      ).lean();
    }

    if (!link_model_var) {
      return (<main className="flex items-center justify-center h-screen text-center">
        <div>
          <h1 className="text-3xl font-bold mb-4">404 - Page Not Found</h1>
          <Link href="/" className="text-blue-500 hover:underline">Go back home</Link> | <Link href="/createlink" className="text-blue-500 hover:underline">Create Your UPI Link</Link>
          
        </div>
      </main>
      );
    }

    return (
      <main className="main">
        <PayComponent 
          pn={searchParams.pn || link_model_var.name} 
          amount_list={amount_list || searchParams.amount_list || link_model_var.amount_list} 
          upiid={link_model_var.upi_id} 
          btnText={searchParams.btnText ||link_model_var.btn_txt} 
          minAmount={searchParams.mam || link_model_var.minAmount}
          transactionNote={searchParams.tn || link_model_var.transactionNote || 'PayViaUPI'}
        />
      </main>
    );
  } catch (error) {
    console.error('Error processing data:', error);
    return {
      notFound: true,
    };
  }
}
