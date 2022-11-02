import { createRef, useState } from "react";
import { withdraw } from "../contracts";
import * as Blockchain from "../blockchain";

const WithdrawForm = ({ cEthBalance }: any) => {

    const [tokens] = useState<any[]>(Blockchain.TOKENS);
    const tokenAddressRef = createRef<HTMLSelectElement>();
    const valueRef = createRef<HTMLInputElement>();

    const onClickWithdraw = async () => {
        let compoundAddress = tokenAddressRef.current?.value;
        if (!compoundAddress) {
            return;
        }
        let [token] = tokens.filter((t: Blockchain.Token) => t.compoundAddress === compoundAddress);
        await withdraw(compoundAddress, token.compoundDecimals, valueRef.current?.value||'0');
    }

    return <>
        <div style={{ textAlign: 'left' }}>
            <select ref={tokenAddressRef}>
                {tokens.map((token: Blockchain.Token) => {
                    return <option value={token.compoundAddress}>{token.symbol}</option>
                })}
            </select>
            <label style={{fontSize: '18px', display: 'inline-block', margin: '10px 0'}}>value <input placeholder={'0'} ref={valueRef} type={'number'} /></label><br />
            cEth: {cEthBalance}
        </div>
        <button onClick={onClickWithdraw}>withdraw</button>
    </>;
}
export default WithdrawForm;