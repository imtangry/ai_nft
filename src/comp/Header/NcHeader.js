import './style/nc_header.scss'
import WalletButton from "./WalletButton";

export default function NcHeader() {
    return (
        <header className="nc_header">
            <div className="nc_logo">
                AI NFT
                <span>_Creator</span>
            </div>
            <WalletButton/>
        </header>
    )
}
