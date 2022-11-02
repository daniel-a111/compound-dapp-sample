import WalletInfo from "../components/WalletInfo";
import CompoundWidget from "../components/CompoundWidget";

const Home = () => {
    const onMetaMaskConnected = () => {
        window.location.reload();
    }
    return <>
        <div className="app-window">
            <WalletInfo onMetaMaskConnected={onMetaMaskConnected} />
            <CompoundWidget />
        </div>
    </>;
}
export default Home;