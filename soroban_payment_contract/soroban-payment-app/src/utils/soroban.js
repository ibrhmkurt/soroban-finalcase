import { isConnected, getPublicKey } from '@stellar/freighter-api';
import { SorobanRpc, Contract, xdr, scValToBigInt } from 'stellar-sdk';

const SERVER_URL = 'https://soroban-testnet.stellar.org';
const CONTRACT_ID = 'CD7HKVKO5IJJJBH2AZ3EVGB4RMC2VJ3X7FT7C24GP6SSEIVLRRA3KNSR'; // Replace with your actual contract ID

export async function connectWallet() {
  if (await isConnected()) {
    return await getPublicKey();
  } else {
    throw new Error('Freighter wallet not connected');
  }
}

export async function makePayment(to, amount, tokenId, message) {
  const server = new SorobanRpc.Server(SERVER_URL);
  const contract = new Contract(CONTRACT_ID);
  
  // Convert BigInt to ScVal
  const amountScVal = xdr.ScVal.scvI128(amount.toString());
  
  const tx = await contract.call(
    "make_payment",
    to,
    amountScVal,
    tokenId,
    Buffer.from(message).toString('base64')
  );

  const result = await server.sendTransaction(tx);
  return result;
}

export async function viewAllMessages() {
  const server = new SorobanRpc.Server(SERVER_URL);
  const contract = new Contract(CONTRACT_ID);
  
  const result = await contract.call("view_all_messages");
  return result.map(msg => Buffer.from(msg, 'base64').toString());
}