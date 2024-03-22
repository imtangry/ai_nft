import {Inter} from "next/font/google";
import NcHeader from "@/comp/Header/NcHeader";
import '@rainbow-me/rainbowkit/styles.css';
import './globals.scss';
import NcBody from "../comp/Body/NcBody";
import {Providers} from "../comp/Provides";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
    title: "Hello NFT",
    description: "Generate NFT use AI",
};

export default function RootLayout({children}) {
    return (
        <html lang="en">
        <body className={[inter.className, 'ai_nft'].join(' ')}>
        <div className="wrapper">
            <Providers>
                <NcHeader/>
                <NcBody/>
                {children}
            </Providers>
        </div>
        </body>
        </html>
    );
}
