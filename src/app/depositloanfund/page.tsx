"use client"
import { BackgroundGradientAnimation } from '@/Layouts/Gradient';
import { Input } from '@/components/Input';
import { updateBalance } from '@/slice/accountSlice';
import { cn } from '@/utils/cn';
import { contract, webjs } from '@/utils/connectToContract';
import { getBalance } from '@/utils/getBalance';
import { Label } from '@radix-ui/react-label';
import { IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const AddFund = () => {
  const[loanAmount,setLoanAmount]=useState("");
  const account=useSelector((state:any)=>state.account);
  const contractOwner=useSelector((state:any)=>state.owner);
  const dispatch=useDispatch();
  
const handleSubmit=async (e:any)=>{
    e.preventDefault();
    let flag=1;
	await contract.methods.addLoanFund().estimateGas({from:account , value: parseInt(loanAmount)})
	.then(async (result:any)=>{
		const gasPrice = await webjs.eth.getGasPrice();
		console.log(gasPrice+"  "+result);
		console.log(result*gasPrice);
		window.alert(`The Total gas will be ${result}
		Current gas price is ${gasPrice}
		Total Gas Cost will be ${gasPrice*result};`)
	})
	.catch((error:any)=>{
		flag=0;
		window.alert("TRANSACTION NOT COMPLETED. "+error);
		console.log(error);
	})
	if(flag==1)
	await contract.methods
    .addLoanFund()
    .send({ from: account, value: parseInt(loanAmount) })
    .catch((error:any) => {
      window.alert("ERROR" + error);
    });
  dispatch(updateBalance(await getBalance(account)));

  }
  const navigate=useRouter();
useEffect(()=>{
  if(contractOwner&&account)
  if(contractOwner?.toUpperCase()!==account?.toUpperCase())
    {
      console.log("tttttttttt",contractOwner?.toUpperCase(),account?.toUpperCase());
      alert("Only admin can add fund");
      navigate.replace('/');
    }
}
,[])

  return (
    <BackgroundGradientAnimation>
    <div className=" mt-18 w-[calc(100%-4rem)] mx-auto rounded-md  h-[40rem] overflow-hidden">
   
       
          
          <div className="relative z-10 mt-36 max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
               <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                DECENTERLIZED BANK
              </h2>
                   <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
              Secured Decenterlized Bank
            </p>
          
            <form className="my-8" onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                {/* <LabelInputContainer>
                  <Label htmlFor="firstname">First name</Label>
                  <Input id="firstname" placeholder="Tyler" type="text" />
                </LabelInputContainer> */}
                {/* <LabelInputContainer>
                  <Label htmlFor="lastname">Last name</Label>
                  <Input id="lastname" placeholder="Durden" type="text" />
                </LabelInputContainer> */}
              </div>
              {/* <LabelInputContainer className="mb-4">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" placeholder="projectmayhem@fc.com" type="email" />
              </LabelInputContainer> */}
              <LabelInputContainer className="mb-4">
                <Label htmlFor="loan">Deposit Fund</Label>
                <Input id="loan" placeholder="Enter Amount" 
                value={loanAmount} 
                onChange={(e)=>setLoanAmount(e.target.value)} 
                type="text" />
              </LabelInputContainer>
              {/* <LabelInputContainer className="mb-8">
                <Label htmlFor="twitterpassword">Your twitter password</Label>
                <Input
                  id="twitterpassword"
                  placeholder="••••••••"
                  type="twitterpassword"
                />
              </LabelInputContainer> */}
       
              <button
                className="bg-gradient-to-br relative group/btn from-cyan-600 dark:from-cyan-600 dark:to-cyan-600 to-neutral-600 block dark:bg-cyan-600 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                type="submit"
              >
                
                Deposit Loan Fund &rarr;
                <BottomGradient />
              </button>
       
              <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
       
              <div className="flex flex-col space-y-4">
                <button
                  className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                  type="submit"
                >
                  <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                  <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                    GitHub
                  </span>
                  <BottomGradient />
                </button>
                <button
                  className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                  type="submit"
                >
                  <IconBrandLinkedin className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                  <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                    Linkedin
                  </span>
                  <BottomGradient />
                </button>
               
              </div>
            </form>
          </div>
    </div>
        </BackgroundGradientAnimation>
    );
    }
    
    const BottomGradient = () => {
    return (
      <>
        <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
      </>
    );
    };
    
    const LabelInputContainer = ({
    children,
    className,
    }: {
    children: React.ReactNode;
    className?: string;
    }) => {
    return (
      <div className={cn("flex flex-col space-y-2 w-full", className)}>
        {children}
      </div>
    );
    };
export default AddFund