"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { contract, webjs } from "@/utils/connectToContract";
import { useDispatch, useSelector } from "react-redux";
import getAccount from "@/utils/getAccount";
import { updateAccountAddress, updateBalance, updateContractOwner, updateStatus } from "@/slice/accountSlice";
import { getBalance } from "@/utils/getBalance";
import { getStatus } from "@/utils/getStatus";
import { showError, showToast } from "@/utils/toast";
import { useRouter } from "next/navigation";

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
      className="text-black dark:text-neutral-200 hover:text-black "
    >
      {children}
    </Link>
  );
};
export default function Navbar({ className}: { className?: string}) {
    const [active, setActive] = useState<string | null>(null);
    const dispatch=useDispatch();
    const navigate=useRouter();
    const contractOwner=useSelector((state:any)=>state.owner);
    console.log(contractOwner);
    const[isAccountChanged,setIsAccountChanged]=useState(true);
    const owner=useSelector((state:any)=>state.owner)
    const account=useSelector((state:any)=>state.account)
    const balance=useSelector((state:any)=>state.balance)
    const accountExist=useSelector((state:any)=>state.status)
    console.log("OUTSODE",accountExist);
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
		showError(error?.innerError?.data?.data?.reason);
        // window.showError(error?.innerError?.data?.data?.reason);
        // window.alert(error?.innerError?.data?.data?.reason);
	})
	
}
catch(error)
{
  console.log(error);
}
if(flag==1)
  {
    try{await contract.methods.createAccount().send({ from: account });
showToast("Account created Successfully");}
catch(error)
{
  console.log(error);
}
}
  dispatch(updateStatus(true));
  // dispatch(updateBalance(await getBalance(account)))
  //test this above line
}

React.useEffect(()=>{
  async function updateBalanceKey(){
    dispatch(updateBalance(await getBalance(account)));
  }
  console.log("BEFORE BALANCE FETCH",account,accountExist);
  if(account && accountExist){
    updateBalanceKey();
  }
},[isAccountChanged])


React.useEffect(()=>{
async function setAccountStatus(){
dispatch(updateStatus(await getStatus(account)))
dispatch(updateContractOwner(await contract.methods.getOwner().call({ from: account })));
setIsAccountChanged(!isAccountChanged);

}
if(account){
setAccountStatus();
}
},[account])

    return (
      <div
        className={cn("fixed top-10 inset-x-0 max-w-8xl mx-auto z-50", className)}
      >
        <Menu setActive={setActive}>
       <HoveredLink href="/"><h1 style={{fontSize:"25px"}}>DECENTERALIZED BANK</h1></HoveredLink>
       <div className="flex space-x-2 justify-evenly w-96 items-center">
            <div style={{color:"black"}}><HoveredLink href="/"  >{ (account!==0x000000000000000000000000000000000000 && accountExist )?'Home':((account!==0x000000000000000000000000000000000000 && !accountExist) ?'Please create an account to use the bank':'Please Connect your wallet to use bank')}</HoveredLink></div>
            {account!==0x000000000000000000000000000000000000 && accountExist && <MenuItem setActive={setActive} active={active} item="Transaction">
                {/* <div className="flex flex-col space-y-4 text-sm"> */}
                <div className="  text-sm grid grid-cols-3 gap-5 p-1">
    
                  <HoveredLink  href="/deposit">Deposit</HoveredLink>
                  <HoveredLink href="/withdraw">Withdraw</HoveredLink>
                  <HoveredLink href="/transfer">Transfer</HoveredLink>
                
                </div>
              </MenuItem>}
             { account!==0x000000000000000000000000000000000000 && accountExist && <MenuItem setActive={setActive} active={active} item="Loan">
                <div className="  text-sm grid grid-cols-2 gap-5 p-1">
                <HoveredLink href="/getloan">Get loan</HoveredLink>
                  <HoveredLink href="/payloan">Pay loan</HoveredLink>
                </div>
              </MenuItem>}
             
             
             { account && owner?.toUpperCase()==account?.toUpperCase() ?<MenuItem setActive={setActive} active={active} item="Manage loan fund">
                <div className="  text-sm grid grid-cols-2 gap-5 p-1">
                <HoveredLink href="/depositloanfund">Deposit loan fund</HoveredLink>
                  <HoveredLink href="/withdrawloanfund">Withdraw loan fund</HoveredLink>
                </div>
              </MenuItem>:null}


       </div>
          <div className="flex items-center m-0 p-0">
         
        <button 
        onClick={()=>{
          async function setAccountAddress(){
            dispatch(updateAccountAddress(await getAccount()))
          }
          if(!account)
          setAccountAddress();
          
        }}
        className={account
        ?"ml-10 px-8 py-2  border-2 border-black dark:border-white uppercase bg-white text-neutarl-700 transition duration-200 text-sm shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] cursor-default"
        :"ml-10 inline-flex px-38 w-96 h-10 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#EA580C,45%,#ADB4BF,55%,#EA580C)] bg-[length:200%_100%] px-6 font-medium text-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"}>
        {account? (account||"Loading....."):"Connect to wallet"}
        </button>
        { 
        <div className="ml-9 text-xs">
          {account ? ((accountExist)?<div style={{display:"flex",flexWrap:"wrap",alignItems:"center"}}><img onClick={()=>{
          navigate.replace('/userdetails');
          }} style={{marginInline:"3px",cursor:"pointer"}} width="40px" src="/user.svg"/><div>{(balance=='-987654321'?"0":balance)+" ETH"}</div></div>:
      <div style={{display:"flex",alignItems:"center"}}>
          <button className="shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,118,255,0.9)] px-2 py-2 bg-[#0070f3] rounded-md text-white font-light transition duration-200 ease-linear"
          onClick={()=>{
            navigate.replace('/userdetails');
            // createAccount();
          }}  
          >
          Create account</button>
      </div>
        ):null}
        </div>
        }
       
      
          </div>
        </Menu>
      </div>
    );
  }
