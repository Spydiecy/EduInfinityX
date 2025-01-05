import { ethers } from 'ethers';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../config/contract';

declare global {
  interface Window {
    ethereum: ethers.providers.ExternalProvider;
  }
}

export async function connectWallet() {
 try {
   if (!window.ethereum) throw new Error('Install MetaMask');
   const provider = new ethers.providers.Web3Provider(window.ethereum);
   await provider.send("eth_requestAccounts", []);
   const signer = provider.getSigner();
   const address = await signer.getAddress();
   return { signer, address };
 } catch (error) {
   console.error(error);
   throw error;
 }
}

export async function getContract() {
 const { signer } = await connectWallet();
 return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
};