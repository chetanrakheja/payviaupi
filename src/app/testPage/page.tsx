import { PayComponent } from "@/components/PayComponent";    
const pn = "Chetan Rakheja";
const upiid = "rakhejachetan-2@okhdfcbank";
// let qrcodelink="https://upi.link/";
const amount_list = "100, 200, 500";
const minAmount = 0;
const transactionNote = "PayViaUPI";
const btnText = "Pay";


export default function Page() {
  return (
    <div>
      <PayComponent upiid={upiid} pn={pn} amount_list={amount_list} btnText={btnText} minAmount={minAmount} transactionNote={transactionNote} />
    </div>
  );
}
