import Web3 from "web3";
import { contractABI, contractAddress } from "./constants";
import { MetaMaskInpageProvider } from "@metamask/providers";
// declare global {
//   interface Window{
//     ethereum?:MetaMaskInpageProvider
//   }
// }
export let webjs:any;
export let contract:any;
export function connectToContract() {
  webjs = new Web3(window.ethereum);
  contract = new webjs.eth.Contract(contractABI, contractAddress);
  console.log("Contract Instance Created");
  console.log(contract.options.address);
}
