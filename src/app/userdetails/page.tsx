"use client";
import { WavyBackground } from '@/Layouts/Wavy';
import { Input } from '@/components/Input';
import { updateBalance, updateStatus } from '@/slice/accountSlice';
import { cn } from '@/utils/cn';
import { contract, webjs } from '@/utils/connectToContract';
import { getBalance } from '@/utils/getBalance';
import { showError, showToast } from '@/utils/toast';
import { Label } from '@radix-ui/react-label';
import { access } from 'fs';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const UserDetails = () => {
    const navigate=useRouter();
    const [formData, setFormData] = useState<any>({
        firstName:'',
        lastName:'',
        email: '',
        phone: '',
        city: '',
        state:'',
        country: '',
    });
    const owner=useSelector((state:any)=>state.owner)
    const account=useSelector((state:any)=>state.account)
    const balance=useSelector((state:any)=>state.balance)
    const userStatus=useSelector((state:any)=>state.status);
    const dispatch=useDispatch();
    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setFormData((prevData:any) => ({
            ...prevData,
            [name]: value,
        }));
    };
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
      try{
        contract.methods.createAccount().send({ from: account }).then(()=>{
            postData('https://bankmanagement-five.vercel.app/addNewUser',{...formData,accountAddress:account}).then(()=>{
                showToast("Account created Successfully");
            })
        }
        )}
  catch(error)
  {
    console.log(error);
  }
  }
    dispatch(updateStatus(true));
    dispatch(updateBalance('-987654321'));
    //test this above line
  }
  async function postData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), 
    });
    if(response.status==200)
    {
    showToast("Account created successfully");
    }
    else
    {
        showError("Account not created")
    }
    return response.json();
  }
  async function putData(url = "", data = {}) {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), 
    });
    if(response.status==200)
        {
            showToast("Account updated successfully");
        }
        else
        {   const responseData=await response.json();
            console.log(responseData);
            showError("Account not updated")
        }
    // return response.json();
  }
  async function getData(url = "") {
    console.log(account);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData=await response.json();
    
    if(response.status==200)
        {
            console.log(responseData);
            setFormData(responseData);
        }
  }
  useEffect(()=>{


        setFormData({
            firstName:'',
            lastName:'',
            email: '',
            phone: '',
            city: '',
            state:'',
            country: '',
        });

if(!account)
{
    alert("Please Connect your wallet");
	navigate.replace('/');
}
if(account && userStatus)
getData(`https://bankmanagement-five.vercel.app/getUserByAddress/${account}`);
  },[account,userStatus]);
    const handleSubmit = async(e:any) => {
        e.preventDefault();
        // Save the form data or perform any other action here
        if(!account) return;
        // if(!userStatus)
        if(!userStatus)
        {   
           
            createAccount();
            return;
        }
        if(userStatus)
        {
            await putData(`https://bankmanagement-five.vercel.app/updateUser/${account}`,{...formData,accountAddress:account}); 
            return;
        }
        console.log('Form data submitted:', formData);
    };
    return (
       <WavyBackground className="max-w-4xl mx-auto pt-32">
            <div className="max-w-md mx-auto p-4  mt-32 bg-white rounded shadow">
                <h1 className="text-2xl font-semibold mb-4">User Details</h1>
                <form className="my-5" onSubmit={handleSubmit}>
                  <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                    <LabelInputContainer>
                      <Label htmlFor="firstname">First name</Label>
                      <Input id="firstname" value={formData.firstName} onChange={(e:any)=>setFormData((prevData:any)=>
                        ({...prevData,firstName:e.target.value})
                      )} placeholder="Enter First Name" type="text" />
                    </LabelInputContainer>
                    <LabelInputContainer>
                      <Label htmlFor="lastname">Last name</Label>
                      <Input id="lastname"value={formData.lastName} onChange={(e:any)=>setFormData((prevData:any)=>
                        ({...prevData,lastName:e.target.value})
                      )} placeholder="Enter Last Name" type="text" />
                    </LabelInputContainer>
                  </div>
                 <LabelInputContainer className="mb-4">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" value={formData.email} onChange={(e:any)=>setFormData((prevData:any)=>
                        ({...prevData,email:e.target.value})
                      )} placeholder="Enter Email Address" type="email" />
                  </LabelInputContainer>
                  <LabelInputContainer className="mb-4">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" value={formData.phone} onChange={(e:any)=>setFormData((prevData:any)=>
                        ({...prevData,phone:e.target.value})
                      )} placeholder="Enter Phone" 
                    type="text" />
                  </LabelInputContainer>
                  <LabelInputContainer className="mb-8">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      placeholder="Enter City"
                      type="text"
                      value={formData.city} onChange={(e:any)=>setFormData((prevData:any)=>
                        ({...prevData,city:e.target.value})
                      )}
                    />
                  </LabelInputContainer> 
                  <LabelInputContainer className="mb-8">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      placeholder="Enter State"
                      type="text"
                      value={formData.state} onChange={(e:any)=>setFormData((prevData:any)=>
                        ({...prevData,state:e.target.value})
                      )}
                    />
                  </LabelInputContainer> 
                  <LabelInputContainer className="mb-8">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      placeholder="Enter Country"
                      type="text"
                      value={formData.country} onChange={(e:any)=>setFormData((prevData:any)=>
                        ({...prevData,country:e.target.value})
                      )}
                    />
                  </LabelInputContainer> 
           
                  <button
                    className="bg-gradient-to-br relative group/btn from-cyan-600 dark:from-cyan-600 dark:to-cyan-600 to-neutral-600 block dark:bg-cyan-600 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    type="submit"
                  >
                  {userStatus?  
                    "Update Account":"Create Account" }
                    <BottomGradient />
                  </button>
           
                  <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-4 h-[1px] w-full" />
           
                  
                </form>
            </div>
       </WavyBackground>
    );
};
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
      <div className={cn("flex flex-col space-y-1 w-full", className)}>
        {children}
      </div>
    );
    };
export default UserDetails