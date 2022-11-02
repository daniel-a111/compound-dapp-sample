import { ethers } from "ethers";
import { CONTRACT_ADDRESS_ETH, TOKENS } from "../blockchain";
import { ABI_COMPOUND, ABI_COMPOUND_ERC20 } from "./abis";

const { ethereum }: any = window;
let provider: any;
let signer: any;

if (ethereum) {
    provider = new ethers.providers.Web3Provider(ethereum);
    signer = provider?.getSigner();    
}

export const deposit = async (compoundAddress: string, decimals: number, valueStr: string) => {
    let value = ethers.utils.parseUnits(valueStr, decimals);
    if (compoundAddress === CONTRACT_ADDRESS_ETH) {
        let contract = new ethers.Contract(compoundAddress, ABI_COMPOUND, signer);
        return await contract.mint({value});
    } else {
        let contract = new ethers.Contract(compoundAddress, ABI_COMPOUND_ERC20, signer);
        return await contract.mint(value);
    }
}

export const withdraw = async (compoundAddress: string, compoundDecimals: number, valueStr: string) => {
    let contract = new ethers.Contract(compoundAddress, ABI_COMPOUND, signer);
    let value = ethers.utils.parseUnits(valueStr, compoundDecimals);
    return await contract.redeem(value);
}

export interface AccountInfo {
    symbol: string;
    error: number;
    balance: string;
    borrowBalance: string;
    exchangeRate: string;
    ethValue: string;
}
export const info = async (address: string): Promise<AccountInfo[]> => {
    let infos: AccountInfo[] = [];
    for (let token of TOKENS) {
        let contract = new ethers.Contract(token.compoundAddress, ABI_COMPOUND, signer);
        let [error, balance, borrowBalance, exchangeRate] = await contract.getAccountSnapshot(address);
        infos.push({
            symbol: token.symbol,
            error: parseInt(ethers.utils.formatUnits(error, 0)),
            balance: ethers.utils.formatUnits(balance, token.compoundDecimals),
            borrowBalance: ethers.utils.formatUnits(borrowBalance, token.compoundDecimals),
            exchangeRate: ethers.utils.formatUnits(exchangeRate.div(ethers.utils.parseEther('1.0')), 0),
            ethValue: ethers.utils.formatUnits(balance.mul(exchangeRate).div(ethers.utils.parseEther('1.0')), token.decimals)
        });
    }
    return infos;
}

