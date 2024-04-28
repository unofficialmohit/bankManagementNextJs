import { contract } from "./connectToContract";
import { updateBalance } from "@/slice/accountSlice";
export async function getBalance(account:any){
    // const account=useSelector((state:any)=>state.account);
    
    try{
      let result = await contract.methods.getBalance().call({ from: account });
      console.log("balance",result);
      if(result==='0')
      {
        return ('-987654321');
        }
        return (result);
    //   setBalance('-9987654321');
    //   setBalance(result);
    }
    catch(error:any)
    {
        console.log(error);
     return('');
    //   setBalance("");
    }
  };