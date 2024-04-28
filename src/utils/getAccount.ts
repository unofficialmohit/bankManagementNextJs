import { contract } from "./connectToContract";

export default async function getAccount(){
    if (window.ethereum) {
      // res[0] for fetching a first wallet
      const account:any=await window.ethereum.request({ method: "eth_requestAccounts" });
      if(!account) 
        {
            alert("Something went wrong, Please contact developer");
            return;      
        }
            // const status= await contract.methods.accountExists().call({ from: account });
            // console.log("ACCOUNT EXISTS : ",status);
            console.log("ADDRESSS : ",account[0]);
            return(account[0]);
    //    return ({account:account[0],status:status});
            // setAccount(res[0]);
  } else {
      alert("install metamask extension!!");
      return;
  }
}