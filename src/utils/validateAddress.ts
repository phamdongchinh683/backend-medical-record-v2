import { ethers } from "ethers";

export const validateAddress = (address: string) => {
  if (!ethers.isAddress(address)) {
    return false;
  }
  if (address.length !== 42) {
    return false;
  }
  if (!address.startsWith("0x")) {
    return false;
  }
  return true;
};
