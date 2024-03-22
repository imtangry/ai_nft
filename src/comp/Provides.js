'use client';

import * as React from 'react';
import {
    RainbowKitProvider,
    getDefaultWallets,
    getDefaultConfig,
} from '@rainbow-me/rainbowkit';

import { defineChain } from 'viem'

import {
    arbitrum,
    base,
    mainnet,
    optimism,
    polygon,
    sepolia,
    zora,
} from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider, createConfig, http } from 'wagmi';

const config1 = createConfig({
    chains: [sepolia],
    transports: {
        [sepolia.id]: http()
    },
})

console.log('createConfig', config1)

const { wallets } = getDefaultWallets();

// 自定义链
const HardHat = defineChain({
    id: 31337,
    name: '本地测试',
    nativeCurrency: { name: 'hardhat Ether', symbol: 'GO', decimals: 18 },
    rpcUrls: {
        default: { http: ['http://127.0.0.1:8545/'] },
    },
    testnet: true
})

const config = getDefaultConfig({
    appName: 'ai_nft',
    projectId: 'YOUR_PROJECT_ID',
    wallets: [
        ...wallets,
    ],
    chains: [
        HardHat,
        mainnet,
        polygon,
        optimism,
        arbitrum,
        base,
        zora,
        sepolia,
        // ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [sepolia] : []),
    ],
    ssr: true,
});

const queryClient = new QueryClient();

export function Providers({ children }) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider modalSize="compact">{children}</RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}
