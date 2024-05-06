"use client"
import { Boxes } from '@/Layouts/Boxes';
import { Input } from '@/components/Input';
import { cn } from '@/utils/cn';
import { Label } from '@radix-ui/react-label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from '../../components/Select';
import { IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react'
import { RemoveScroll } from 'react-remove-scroll';
import { contract, webjs } from '@/utils/connectToContract';
import { useDispatch, useSelector } from 'react-redux';
import { updateBalance } from '@/slice/accountSlice';
import { getBalance } from '@/utils/getBalance';
import { useRouter } from 'next/navigation';

const Loan =() => {
  const account=useSelector((state:any)=>state.account);
  const dispatch=useDispatch();
  const [userDetails,setUserDetails]=useState<any>([]);
  const[loanType,setLoanType]=useState("");
  const payLoan=async (e:any)=>{
    e.preventDefault();
    if (loanType == "car") {
      let flag=1;
      await contract.methods.payCarEmi().estimateGas({from:account})
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
        await contract.methods.payCarEmi().send({ from: account });
      } 
      
      
      else if (loanType == "home") {
      let flag=1;
      await contract.methods.payHomeEmi().estimateGas({from:account})
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
        await contract.methods.payHomeEmi().send({ from: account });
      } 
      
      
      else {
      let flag=1;
      await contract.methods.payEducationEmi().estimateGas({from:account})
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
        await contract.methods.payEducationEmi().send({ from: account });
  
      
    }
    dispatch(updateBalance(await getBalance(account)));
    getDetails();
  }

  async function getDetails(){
    const result = await contract.methods
    .displayUserDetails()
    .call({ from: account });
    setUserDetails(result);
  }

  const navigate=useRouter();
  const userStatus=useSelector((state:any)=>state.status);
  useEffect(()=>{
   
	if(!userStatus)
		{
			alert("Please Connect your wallet");
			navigate.replace('/');
		}

  },[]);
  useEffect(()=>{
   
    if(account)
    {
   getDetails();
      }
  },[account])
  console.log("asdasdasd",userDetails);

  return(

    <div className=" mt-18 w-[calc(100%-4rem)] mx-auto rounded-md  h-[40rem] overflow-hidden">
   <Boxes/>
       
       <div className="relative z-10 mt-36 max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <RemoveScroll>
           <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
             DECENTERLIZED BANK
           </h2>
        </RemoveScroll>
         <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
           Securely pay emi to decenterlized Bank
         </p>
       
         <form className="my-8" onSubmit={payLoan}>
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
           {/* <LabelInputContainer className="mb-4">
             <Label htmlFor="loan">Pay Loan</Label>
             <Input id="loan" placeholder="Enter Amount" 
             // value={depositAmount} 
             // onChange={(e)=>setDepositAmount(e.target.value)} 
             type="text" />
           </LabelInputContainer> */}
           {/* <LabelInputContainer className="mb-8">
             <Label htmlFor="twitterpassword">Your twitter password</Label>
             <Input
               id="twitterpassword"
               placeholder="••••••••"
               type="twitterpassword"
             />
           </LabelInputContainer> */}
             <LabelInputContainer className="mb-4">
        <Label htmlFor="loan">Loan Type</Label>

          <Select
          value={loanType}
          onValueChange={(e)=>{
            setLoanType(e);
            // console.log("ddd",e);
          }}
          >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a loan type" />
        </SelectTrigger>
        <SelectContent className='bg-white'>
          <SelectGroup>
            <SelectLabel>Loan Type</SelectLabel>
            <SelectItem value="car"  className='cursor-pointer'>Car Loan</SelectItem>
            <SelectItem value="home"  className='cursor-pointer'>Home Loan</SelectItem>
            <SelectItem value="education"  className='cursor-pointer'>Education Loan</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
        </LabelInputContainer>
          {loanType=="car" &&  (userDetails?.CarLoan==0?<div>YOU DONT HAVE PENDING CAR LOAN</div>:
          <div>
          <div>
          {"Loan Amount : "+userDetails?.CarLoan}
          </div>
          <div>
          {"Emi Cost : "+userDetails?.CarEmiCost}
          </div>
          <div>
          {"Emi Left : "+userDetails?.CarEmiLeft}
          </div>
          </div>)
          }

{loanType=="home" && (userDetails?.HomeLoan==0?<div>YOU DONT HAVE PENDING HOME LOAN</div>:
          <div>
          <div>
          {"Loan Amount : "+userDetails?.HomeLoan}
          </div>
          <div>
          {"Emi Cost : "+userDetails?.HomeEmiCost}
          </div>
          <div>
          {"Emi Left : "+userDetails?.HomeEmiLeft}
          </div>
          </div>
          )}

{loanType=="education" && (userDetails?.EducationLoan==0?<div>YOU DONT HAVE PENDING EDUCATION LOAN</div>:
          <div>
          <div>
          {"Loan Amount : "+userDetails?.EducationLoan}
          </div>
          <div>
          {"Emi Cost : "+userDetails?.EducationEmiCost}
          </div>
          <div>
          {"Emi Left : "+userDetails?.EducationEmiLeft}
          </div>
          </div>
          )}

           <button
             className="mt-16 bg-gradient-to-br relative group/btn from-cyan-600 dark:from-cyan-600 dark:to-cyan-600 to-neutral-600 block dark:bg-cyan-600 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
             type="submit"
           >
             
             Pay Emi &rarr;
             <BottomGradient />
           </button>
    
           {/* <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
    
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
            
           </div> */}
         </form>
       </div>
   </div>
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
   
export default Loan