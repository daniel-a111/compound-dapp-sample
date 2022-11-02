const InfoTable = ({accountInfo}: any) => {
    return <>
        {accountInfo.symbol}
        <table>
            <tbody>
                <tr>
                    <td>balance</td><td>{accountInfo?.balance||'loading...'}</td>
                </tr>
                <tr>
                    <td>borrow</td><td>{accountInfo?.borrowBalance||'loading...'}</td>
                </tr>
                <tr>
                    <td>{accountInfo.symbol} value</td><td>{accountInfo?.ethValue||'loading...'}</td>
                </tr>
            </tbody>
        </table>
    </>;
}
export default InfoTable;