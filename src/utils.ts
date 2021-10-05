import { Web3Provider } from "@ethersproject/providers";
import { isAddress } from "@ethersproject/address";
import { Contract } from "@ethersproject/contracts";

export const fetcher = (library: any, abi?: any) => (...args: any[]) => {
  const [arg1, arg2, ...params] = args;
  if(isAddress(arg1)) { // is contract
    const addr = arg1;
    const method = arg2;
    const contract = new Contract(addr, abi, library.getSigner())
    contract[method](...params);
  }
  const method = arg1;
  return library[method](arg2, ...params);
}
