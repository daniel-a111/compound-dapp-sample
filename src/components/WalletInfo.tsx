import { useEffect, useState } from "react";
import { copyToClipboard, formatAddress } from "../utils";
import * as Blockchain from '../blockchain';

const WalletInfo = ({onMetaMaskConnected}: any) => {

    const [mount] = useState<boolean>(false);
    const [account, setAccount] = useState<string|undefined>();
    const [network, setNetwork] = useState<string>();
    const [chainId, setChainId] = useState<string>();
    const [ethBalance, setEthBalance] = useState<string>();

    const onComponentLoad = async () => {
        if (await Blockchain.isConnected()) {
            loadInfo();
        }
    }
    useEffect(() => {
        onComponentLoad();
    }, [mount]);

    const loadInfo = async () => {
        setAccount(Blockchain.getAccount());
        setChainId(Blockchain.getChainId());
        setNetwork(Blockchain.getNetwork());
        Blockchain.getEthBalance().then((balance: string|undefined) => {
            setEthBalance(balance||'loading');
        });
    }

    async function onClickConnectMetaMask() {
        const { ethereum }: any = window;
        try {
            if (!ethereum) {
                window.open('https://metamask.io/', '_blank');
                return;
            }
            await Blockchain.connect();
            if (await Blockchain.isConnected()) {
                loadInfo();
                onMetaMaskConnected();
            }
        } catch (error) {
            console.error(error);
        }
    }

    return <>
        {account && <span className="account-info account-address" onClick={copyToClipboard} data-copy={account}>{formatAddress(account)}</span>}
        {!account && <span className="account-info account-address">Address: -</span>}
        <span className="account-info account-network">Network {network}</span>
        <span className="account-info account-chain-id">Chain Id {chainId}</span>
        <button className="right" onClick={onClickConnectMetaMask}>connect</button>
        <div className="eth-balance">
            <span>eth balance<br /><b>{parseFloat(ethBalance||'0').toFixed(3)}</b> ETH</span>
        </div>
    </>;
}
export default WalletInfo;