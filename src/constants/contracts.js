import { Contract } from "ethers";
import { Erc20ABI, PurchaseABI, UnderwritingABI } from "../abi";


const createContractInterface = (abi) => {
    return (address, provider) => {
        return new Contract(address, abi, provider);
    }
}

export const iPurchaseContract = createContractInterface(PurchaseABI);
export const iUnderwritingContract = createContractInterface(UnderwritingABI);
export const iFaktrContract = createContractInterface(Erc20ABI);
export const iUsdtContract = createContractInterface(Erc20ABI);