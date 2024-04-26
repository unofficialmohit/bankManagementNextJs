"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { contract, webjs } from "@/utils/connectToContract";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative ">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-black hover:opacity-[0.9] dark:text-white"
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active" // layoutId ensures smooth animation
                className="bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl"
              >
                <motion.div
                  layout // layout ensures smooth animation
                  className="w-max h-full p-4"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

 const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)} // resets the state
      className="relative rounded-full boder border-transparent dark:bg-black dark:border-white/[0.2] bg-white shadow-input flex justify-center space-x-4 px-8 py-6 "
    >
      {children}
    </nav>
  );
};



export const HoveredLink = ({ children, ...rest }: any) => {
  return (
    <Link
      {...rest}
      className="text-neutral-700 dark:text-neutral-200 hover:text-black "
    >
      {children}
    </Link>
  );
};
export default function Navbar({ className ,getAccount,account,balance}: { className?: string,getAccount:any,account:string ,balance:string}) {
    const [active, setActive] = useState<string | null>(null);
    const createAccount=async ()=>{
      let flag=1;
	try{
   await contract.methods.createAccount().estimateGas({from:account})
	.then(async (result:any)=>{
		const gasPrice = await webjs.eth.getGasPrice();
		console.log(gasPrice+"  "+result);
		console.log(result*gasPrice);
		window.alert(`The Total gas will be ${result}`)
	})
	.catch((error:any)=>{
		flag=0;
		window.alert("YOU CANT PERFORM THIS TRANSACTION");
	})
	if(flag==1)
  	await contract.methods.createAccount().send({ from: account });
}
catch(error)
{
  console.log(error);
}

    }
    return (
      <div
        className={cn("fixed top-10 inset-x-0 max-w-8xl mx-auto z-50", className)}
      >
        <Menu setActive={setActive}>
       <HoveredLink href="/"><h1 style={{fontSize:"30px",marginRight:"100px"}}>DECENTERALIZED BANK</h1></HoveredLink>
       <div className="flex space-x-6 mt-2 justify-evenly w-96">
            <HoveredLink href="/">Home</HoveredLink>
            <MenuItem setActive={setActive} active={active} item="Transaction">
                {/* <div className="flex flex-col space-y-4 text-sm"> */}
                <div className="  text-sm grid grid-cols-2 gap-5 p-1">
    
                  <HoveredLink href="/deposit">Deposit</HoveredLink>
                  <HoveredLink href="/withdraw">Withdraw</HoveredLink>
                
                </div>
              </MenuItem>
              <MenuItem setActive={setActive} active={active} item="Loan">
                <div className="  text-sm grid grid-cols-2 gap-5 p-1">
                <HoveredLink href="/getloan">Get loan</HoveredLink>
                  <HoveredLink href="/payloan">Pay loan</HoveredLink>
                </div>
              </MenuItem>
              <MenuItem setActive={setActive} active={active} item="Manage loan fund">
                <div className="  text-sm grid grid-cols-2 gap-5 p-1">
                <HoveredLink href="/addloanfund">Deposit loan fund</HoveredLink>
                  <HoveredLink href="/withdrawloanfund">Withdraw loan fund</HoveredLink>
                </div>
              </MenuItem>
       </div>
          <div className="flex items-center">
         
        <button 
        onClick={()=>{
          if(!account)
          getAccount();
        }}
        className={account
        ?"ml-10 px-8 py-2  border-2 border-black dark:border-white uppercase bg-white text-neutarl-700 transition duration-200 text-sm shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] cursor-default"
        :"ml-10 inline-flex px-38 w-96 h-10 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#EA580C,45%,#ADB4BF,55%,#EA580C)] bg-[length:200%_100%] px-6 font-medium text-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"}>
        {account? (account||"Loading....."):"Connect to wallet"}
        </button>
        { 
        <div className="ml-9">{account && ((balance || balance=='-987654321')?(balance=='-987654321'?"0":balance)+" ETH":
      <div style={{display:"flex",alignItems:"center"}}>
          <button className="shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,118,255,0.9)] px-2 py-2 bg-[#0070f3] rounded-md text-white font-light transition duration-200 ease-linear"
          onClick={()=>{
            createAccount();
          }}  
          >
          Create account</button>
      </div>
        )}</div>
        }
       
      
          </div>
        </Menu>
      </div>
    );
  }
