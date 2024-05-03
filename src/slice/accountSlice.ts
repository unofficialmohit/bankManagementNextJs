import { createSlice} from "@reduxjs/toolkit";
const initialState:any={
    account:0x000000000000000000000000000000000000,
    balance:0,
    status:false,    //account is created or not
    owner:null
}
export const accountSlice:any=createSlice({
    name:"account",
    initialState,
    reducers:{
        updateAccountAddress:(state:any,action:any)=>{
           return {...state,account:action.payload}  
        },
        updateBalance:(state:any,action:any)=>{
            return {...state,balance:action.payload}
        },
        updateStatus:(state:any,action:any)=>{
            return{...state,status:action.payload}
        },
        updateContractOwner:(state:any,action:any)=>{
            return{...state,owner:action.payload}
        }

    }

})
export const {updateAccountAddress,updateBalance,updateStatus,updateContractOwner}=accountSlice.actions;
export default accountSlice.reducer;