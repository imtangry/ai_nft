'use client'
import {ConnectButton} from '@rainbow-me/rainbowkit';
import {Providers} from "@/comp/Provides";

export default function WalletButton() {
    return (
        <Providers>
            <ConnectButton accountStatus="address"/>
        </Providers>
    )
}
