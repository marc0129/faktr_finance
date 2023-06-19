import "../assets/rainbowkit.css"; //have to do this for now due to test failures with import direct from library;

import { connectorsForWallets, wallet } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";

export const { chains, provider, webSocketProvider } = configureChains(
    [
        chain.polygonMumbai,
        chain.polygon,
        chain.mainnet,
        chain.rinkeby
    ],
    [
        jsonRpcProvider({ rpc: chain => ({ http: chain.rpcUrls.default }) }),
        publicProvider()
    ]
);

const needsInjectedWalletFallback =
    typeof window !== "undefined" && window.ethereum && !window.ethereum.isMetaMask && !window.ethereum.isCoinbaseWallet;

const connectors = connectorsForWallets([
    {
        groupName: "Recommended",
        wallets: [
            wallet.metaMask({ chains, shimDisconnect: true }),
            wallet.brave({ chains, shimDisconnect: true }),
            wallet.walletConnect({ chains }),
            wallet.trust({ chains, shimDisconnect: true }),
            wallet.coinbase({ appName: "faktr.finance", chains }),
            wallet.imToken({ chains }),
            wallet.steak({ chains }),
            ...(needsInjectedWalletFallback ? [wallet.injected({ chains, shimDisconnect: true })] : [])
        ]
    }
]);

export const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
});
