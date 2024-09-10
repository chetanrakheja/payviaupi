"use client";
import { useState,useCallback,useEffect } from "react";
import { PayComponent } from "@/components/PayComponent";    
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"



export default function Page() {
  const [upi, setUPI] = useState('');
  const [name, setName] = useState('');
  const [amountList, setAmountList] = useState([] as number[]);
  const [amountListStr, setAmountListStr] = useState('');
  const [btnText, setBtnText] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [transactionNote, setTransactionNote] = useState('');
  const [UPILink, setUPILink] = useState('');
  const [linkStatus, setLinkStatus] = useState('');
  const router = useRouter();

  const debounce = (func: Function, delay: number) => {
    let timeout:any;
    return function(...args:any) {
      clearTimeout(timeout);
      // timeout = setTimeout(() => func.apply(this, args), delay);
      timeout = setTimeout(() => func(...args), delay);
    };
  };


  // Function to check UPI link availability
  const checkLinkAvailability = (UPILink:string) => {
    console.log('Checking link availability for:', UPILink);
    fetch('/api/check_url_availability', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ upi_link: UPILink.toLowerCase() })
    })
      .then(response => response.json())
      .then(data => {
        setLinkStatus(data.isAvailable ? 'Available' : 'Not Available');
      })
      .catch(error => {
        console.error('Error:', error);
        setLinkStatus('Not Available'); // Reset status on error
      });
  };

  // Memoized debounced function
  const debouncedCheckLinkAvailability = useCallback(
    debounce(checkLinkAvailability, 500),
    []
  );

  // Handle UPI input and check link availability
  useEffect(() => {
    if (upi) {
      const prefilledLink = upi.split('@')[0];
      setUPILink(prefilledLink);
      debouncedCheckLinkAvailability(prefilledLink);
    }
  }, [upi, debouncedCheckLinkAvailability]);

  // Handle amount selection and update the list
  const handleList = (el :string | string[]) => {
    const amount = Number(el);
    let updatedAmountList;

    if (amountList.includes(amount)) {
      updatedAmountList = amountList.filter(e => e !== amount);
    } else if (amountList.length < 4) {
      updatedAmountList = [...amountList, amount].sort((a, b) => a - b);
    } else {
      updatedAmountList = amountList; // No change if the list is already full
    }

    const amountListString = updatedAmountList.join(',');

    setAmountList(updatedAmountList);
    setAmountListStr(amountListString);
  };

  // Create link with provided details
  const createLink = () => {

    console.log('Creating link with:', name, upi, UPILink, btnText, amountList, minAmount, transactionNote);
    
    if (!name || !upi || !UPILink) {
      return;
    }

    fetch('/api/createlink', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "name": name,
        "upi_id": upi,
        "btn_txt": btnText,
        "upi_link": UPILink.toLowerCase(),
        "amount_list": amountListStr,
        "minAmount": minAmount,
        "transactionNote": transactionNote
      })
    })
    .then(response => response.json())
    .then(data => {
      
      if (data.upi_link) {
        console.log('Link created:', data.upi_link);
        // Redirect the user to the generated link
        // redirect(`/${data.upi_link}`)
        
        router.push(`/${data.upi_link}`);
      } else {
        console.error('Failed to create link');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };



  return (
    <article className="container-fluid">
    <main className="main p-16 flex-1 flex flex-col justify-center items-center">
      <h1 className="text-4xl ">Create a Pay Via UPI Link!</h1>

      <div className="flex flex-col lg:flex-row items-stretch gap-4 py-5" style={{ gap: "25px" }}>
        <div className="w-full lg:w-1/2 form">
          <form>
            <div className="flex flex-col name">
              <label>Name*</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
              />
            </div>
            <div className="flex flex-col upiID">
              <label>UPI ID*</label>
              <input
                value={upi}
                onChange={(e) => setUPI(e.target.value)}
                placeholder="Your UPI ID"
              />
            </div>
            <div className="flex flex-col max-w-xs max-h-full amtList">
              <label>Select up to four amounts that you would like to receive. (₹)</label>
              <div className="flex" style={{ flexWrap: "wrap", gap: "10px" }}>
                {["10", "20", "50", "100", "200", "500", "1000", "1500", "2000"].map(el => (
                  <div
                    key={el}
                    tabIndex={0}
                    onClick={() => handleList(el)}
                    className="listItem"
                    style={{
                      padding: "10px 10px",
                      display: "flex",
                      flexWrap: "wrap",
                      maxHeight: "100px",
                      maxWidth: "120px",
                      width: "100px",
                      justifyContent: "space-between",
                      gap: "10px",
                      listStyle: "none",
                      border: amountList.includes(Number(el)) ? "1px solid green" : "1px solid #eee",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    <span>{"₹ " + el}</span>
                    {amountList.includes(Number(el))}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col minAmt">
              <label>Minimum Amount</label>
              <input
                value={minAmount}
                onChange={(e) => setMinAmount(e.target.value)}
                placeholder="Minimum Amount"
              />
            </div>
            <div className="flex flex-col txnNote">
              <label>Transaction Note</label>
              <input
                value={transactionNote}
                onChange={(e) => setTransactionNote(e.target.value)}
                placeholder="PayViaUpi.com"
              />
            </div>
            <div className="flex flex-col btnText">
              <label>Button Text</label>
              <input
                value={btnText}
                onChange={(e) => setBtnText(e.target.value)}
                placeholder="Pay"
              />
            </div>
            <div className="flex flex-col upiLink">
              <label>UPI Link</label>
              <input
                value={UPILink}
                onChange={(e) => {
                  setUPILink(e.target.value);
                  debouncedCheckLinkAvailability(e.target.value);
                }}
                placeholder="Your Unique UPI Link"
              />
              {linkStatus && (
                <div style={{ color: linkStatus === 'Available' ? 'green' : 'red' }}>
                  {linkStatus}
                </div>
              )}
            </div>
          </form>
              <Button className="my-4 w-56" onClick ={createLink}>Create Link</Button>
          
        </div>
        <div className="w-full lg:w-1/2">
          <PayComponent
            pn={name}
            amount_list={amountListStr}
            upiid={upi}
            btnText={btnText}
            minAmount={minAmount}
            transactionNote={transactionNote}
          />
        </div>
      </div>
      <div><b>Note:</b> Once the link is generated, it cannot be changed at this time. We are working on this feature, and it will be available soon.</div>
    </main>
  </article>
  );
}
