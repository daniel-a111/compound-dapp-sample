import { createRef, useState } from "react";
import { deposit } from "../contracts";
import * as Blockchain from "../blockchain";

const DepositForm = ({ ethBalance }: any) => {

    const [tokens] = useState<any[]>(Blockchain.TOKENS);

    const onClickDeposit = async () => {
        let compoundAddress = tokenAddressRef.current?.value;
        if (!compoundAddress) {
            return;
        }
        let [token] = tokens.filter((t: Blockchain.Token) => t.compoundAddress === compoundAddress);
        await deposit(compoundAddress, token.decimals, valueRef.current?.value||'0');
    }

    const tokenAddressRef = createRef<HTMLSelectElement>();
    const valueRef = createRef<HTMLInputElement>();

    return <>
        <div style={{textAlign: 'left'}}>
            <select ref={tokenAddressRef}>
                {tokens.map((token: Blockchain.Token) => {
                    return <option value={token.compoundAddress}>{token.symbol}</option>
                })}
            </select>
            <label style={{width: '100%', fontSize: '18px', display: 'inline-block', margin: '10px 0'}}>value <input placeholder={'0'} ref={valueRef} type={'number'} /></label><br />
            eth balance: {ethBalance}
        </div>
        <button onClick={onClickDeposit}>deposit</button>
    </>;
}
export default DepositForm;