import { InjectedConnector } from "@web3-react/injected-connector";
import { NetworkConnector } from "@web3-react/network-connector";
import { NETWORK_URLS, SupportedChainId, supportedChainIds } from "../contants";

export const injectedConnector = new InjectedConnector({
  supportedChainIds: supportedChainIds
});

export const network = new NetworkConnector({
urls: {
    [SupportedChainId.MAINNET]: NETWORK_URLS[SupportedChainId.MAINNET],
    [SupportedChainId.RINKEBY]: NETWORK_URLS[SupportedChainId.RINKEBY],
    [SupportedChainId.ROPSTEN]: NETWORK_URLS[SupportedChainId.ROPSTEN],
    [SupportedChainId.KOVAN]: NETWORK_URLS[SupportedChainId.KOVAN],
    [SupportedChainId.GOERLI]: NETWORK_URLS[SupportedChainId.GOERLI],
  },
  defaultChainId: SupportedChainId.MAINNET,
});

