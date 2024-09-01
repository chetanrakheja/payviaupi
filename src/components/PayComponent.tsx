"use client";
import Image from "next/image";
import Link from "next/link";
import QRCode from "qrcode";
import { SetStateAction, useState,useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from 'next-themes';


const generateQR = (text: string, isDarkMode: boolean) => {
  try {
    const options = {
      color: {
        dark: isDarkMode ? '#FFFFFF' : '#000000',  // QR code foreground color
        light: isDarkMode ? '#000000' : '#FFFFFF'  // QR code background color
      }
    };

    return QRCode.toDataURL(text, options).then((res: { toString: () => any; }) => res.toString());
  } catch (err) {
    console.error(err);
  }
};
interface PayComponentProps {
  upiid: string | null | undefined;
  pn: string | null | undefined;
  amount_list: string | string[]| null | undefined;
  btnText: string | null | undefined;
  minAmount?: string| null| undefined;
  transactionNote?: string| null| undefined; // Optional string type
}

export function PayComponent({ upiid, pn, amount_list, btnText, minAmount, transactionNote }: PayComponentProps) {
  if (typeof(amount_list)=="string"){
    if (amount_list) {
      amount_list = amount_list && amount_list.split(",");
    } else {
      amount_list = [];
    }
  }
    const { theme } = useTheme() as { theme: string };
    const [value, setValue] = useState('');
    const currency = "INR";
    const [img, setImg] = useState("");
    const [qrcodelink, setqrcodelink] = useState("");

useEffect(() => {
  let qrcodelink_temp = `upi://pay?cu=${currency}` +
    `&pa=${upiid}` +
    `${value ? `&am=${String(value)}` : ''}` +
    `${pn ? `&pn=${encodeURIComponent(pn)}` : ''}` +
    `${minAmount ? `&mam=${String(minAmount)}` : ''}` +
    `${transactionNote ? `&tn=${String(transactionNote)}` : ''}`;
  setqrcodelink(qrcodelink_temp);

  const isDarkMode = theme === 'dark';

  generateQR(qrcodelink_temp, isDarkMode)?.then((res) => setImg(res));
}, [currency, upiid, value, pn, minAmount, transactionNote, theme]);

  return (
    <div className="container flex p-10">
    <div className="text-center border-solid border p-5 m-auto border-black dark:border-white rounded-3xl max-w-72 min-w-64" >
        <section className="column max center" style={{ gap: "15px" }}>
                UPI payment to 
                <div className="font-medium text-balck mt-2 tracking-widest text-base">
                  {pn ? pn : upiid}
                  </div>
              <div>
                <div className="column p-4">
                  <div className="font-light margin-left-20 text-start">
                    Enter the Amount
                  </div>
                  <div className="flex center gap-x-1">
                    <label className="text-lg content-center dark:text-white text-black text-center" >
                      {"\u20B9"}
                    </label>
                    <input className="border rounded-md p-2 max-w-full"
                      type="number"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                    />
                  </div>
                </div>
    
    
                <li className="list-none flex flex-row justify-center gap-1">
                  {(amount_list as string[]) &&
                    (amount_list as string[]).map((el) => {
                      const trimmedValue = el.trim();
                      return (
                        <div className="font-sans border-solid border-2 rounded-full px-2 py-0 hover:border-lime-400 transition-all ease-in "
                          onKeyDown={(e) =>
                            e.key === "Enter" ? setValue(trimmedValue) : null
                          }
                          tabIndex={0}
                          onClick={() => setValue(trimmedValue)}
                          key={trimmedValue}
                        >
                          {trimmedValue}
                        </div>
                      );
                    })}
                </li>

              </div>
              <div className="flex flex-col p-4">
                <Image className="p-0 m-auto" src={img} alt={upiid} width={200} height={200}/>
                
                <div className="text-sm color-6B6B6B textAlign-center">
                  {upiid}
                </div>
                
              </div>
              <div>
              <Button asChild>
                <Link rel="noreferrer" href={qrcodelink}>{btnText ? btnText : "Pay"}</Link>
              </Button>
                </div>
            </section>
          </div>
          </div>
  );
}
