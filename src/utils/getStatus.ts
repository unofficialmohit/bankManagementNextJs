import { contract } from "./connectToContract";
import { updateBalance } from "@/slice/accountSlice";
export async function getStatus(account:any){
    try{
      let result = await contract.methods.accountExists().call({ from: account });
      console.log("sssssssssssssssss",account,result);
        return (result);
    }
    catch(error:any)
    {
     console.log(error);
     return(false);
    }
  };