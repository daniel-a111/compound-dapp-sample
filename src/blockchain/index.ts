import { ethers } from "ethers";

const NETWORKS: any = {
    '0x1': 'Ethereum Main Network (Mainnet)',
    '0x3': 'Ropsten Test Network',
    '0x4': 'Rinkeby Test Network',
    '0x5': 'Goerli Test Network',
    '0x2a': 'Kovan Test Network'
}

export const CONTRACT_ADDRESS_ETH = '0x64078a6189Bf45f80091c6Ff2fCEe1B15Ac8dbde';

export interface Token {
    symbol: string;
    decimals: number;
    compoundAddress: string;
    compoundDecimals: number;
}

export const TOKENS: Token[] = [{
    symbol: 'ETH',
    decimals: 18,
    compoundAddress: '0x64078a6189Bf45f80091c6Ff2fCEe1B15Ac8dbde',
    compoundDecimals: 8
}
, {
    symbol: 'DAI',
    compoundAddress: '0x0545a8eaF7ff6bB6F708CbB544EA55DBc2ad7b2a',
    decimals: 18,
    compoundDecimals: 8
}
];


let provider: any;
let account: string|undefined;
let chainId: string|undefined;

const { ethereum }: any = window;

if (ethereum) {
    provider = new ethers.providers.Web3Provider(ethereum);
    ethereum.on('accountsChanged', (accounts: string[]) => {
        account = accounts[0];
    });
    ethereum.on('chainChanged', (id: string) => {
        chainId = id;
    });
}

export const connect = async () => {
    const { ethereum }: any = window;
    try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts[0]) {
            account = accounts[0];
            chainId = await ethereum.request({ method: 'eth_chainId' });
        }
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export const isConnected = async () => {

    account = (await ethereum.request({ method: 'eth_accounts' }))[0];
    chainId = await ethereum.request({ method: 'eth_chainId' });
    return !!account;
}

export const getAccount = () => {
    return account;
}

export const getChainId = () => {
    return chainId;
}

export const getNetwork = () => {
    if (chainId && NETWORKS[chainId]) {
        return NETWORKS[chainId];
    }
}

export const getEthBalance = async () => {
    return account ? ethers.utils.formatEther(await provider.getBalance(account)) : undefined;
}

