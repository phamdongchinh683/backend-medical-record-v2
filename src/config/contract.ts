import { ethers } from "ethers";
import { MEDICAL_CONTRACT_ABI } from "../abi/contractAbi";
import { contractAddress, rpcKey } from "../utils/constants";

const provider = new ethers.JsonRpcProvider(
  `https://sepolia.infura.io/v3/${rpcKey}`
);

const contract = new ethers.Contract(
  contractAddress,
  MEDICAL_CONTRACT_ABI,
  provider
);

export default contract;
