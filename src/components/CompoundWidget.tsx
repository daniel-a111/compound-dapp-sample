import { useEffect, useState } from "react";
import { AccountInfo, info } from "../contracts";
import DepositForm from "./DepositForm";
import WithdrawForm from "./WithdrawForm";
import InfoTable from "./InfoTable";
import * as Blockchain from "../blockchain";

const ACTION_MODE_DEPOSIT = 1;
const ACTION_MODE_WITHDRAW = 2;
const ACTION_MODE_INFO = 3;

const CompoundWidget = () => {

    const [mount] = useState<boolean>(false);
    const [accountInfo, setAccountInfo] = useState<AccountInfo[]>([]);
    const [ethBalance, setEthBalance] = useState<string>();
    const [cEthBalance, setCEthBalance] = useState<string>();
    const [actionMode, setActionMode] = useState<number|undefined>(ACTION_MODE_INFO);

    useEffect(() => {
        onComponentLoad();
    }, [mount]);

    useEffect(() => {
        if (accountInfo?.length > 0) {
            setCEthBalance(accountInfo[0].balance);
        }
    }, [accountInfo]);

    const onComponentLoad = async () => {
        if (await Blockchain.isConnected()) {
            let account = Blockchain.getAccount();
            if (account) {
                info(account).then((accountInfo) => {
                    setAccountInfo(accountInfo);
                });
                Blockchain.getEthBalance().then((balance: string|undefined) => {
                    setEthBalance(balance||'loading...');
                })
            }
        }
    }
    return <>
        <div className="compound-widget">
            <div className="menu">
                <button className={'menu-item' + (actionMode === ACTION_MODE_INFO ? ' active' : '')} onClick={() => { setActionMode(ACTION_MODE_INFO) }}>get info</button>
                <button className={'menu-item' + (actionMode === ACTION_MODE_DEPOSIT ? ' active' : '')} onClick={() => { setActionMode(ACTION_MODE_DEPOSIT) }}>deposit</button>
                <button className={'menu-item' + (actionMode === ACTION_MODE_WITHDRAW ? ' active' : '')} onClick={() => { setActionMode(ACTION_MODE_WITHDRAW) }}>withdraw</button>
            </div>
            <div className="dapp-container">
                <div className="form">
                    {
                        actionMode === ACTION_MODE_INFO &&
                        <>
                            {accountInfo?.map((i: AccountInfo) => {
                                return <InfoTable accountInfo={i} />
                            })}
                            {
                                !accountInfo.length &&
                                <>loading...</>
                            }
                        </>
                    }
                    {
                        actionMode === ACTION_MODE_WITHDRAW &&
                        <WithdrawForm cEthBalance={cEthBalance} />
                    }
                    {
                        actionMode === ACTION_MODE_DEPOSIT &&
                        <DepositForm ethBalance={ethBalance} />
                    }
                </div>
            </div>
        </div>
    </>;
}
export default CompoundWidget;