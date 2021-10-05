import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { injectedConnector } from "../connectors";


export default function useInActiveListener(suppress = false) {
  const { active, activate, error } = useWeb3React<Web3Provider>();

  useEffect(() => {
    if(suppress) {
      return () => {}
    }

    const { ethereum } = window as any;
    if(ethereum && ethereum.on && !active && !error) {

      const handleChainChanged = (chainId: number) => {
        console.log("chainChanged", chainId);
        activate(injectedConnector);
      };

      const handleAccountsChanged = (accounts: any[]) => {
        console.log("accountsChanged", accounts);
        if (accounts.length > 0) {
          activate(injectedConnector);
        }
      };

      const handleNetworkChanged = (networkId: number) => {
        console.log("networkChanged", networkId);
        activate(injectedConnector);
      };

      ethereum.on("chainChanged", handleChainChanged);
      ethereum.on("accountsChanged", handleAccountsChanged);
      ethereum.on("networkChanged", handleNetworkChanged);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener("chainChanged", handleChainChanged);
          ethereum.removeListener("accountsChanged", handleAccountsChanged);
          ethereum.removeListener("networkChanged", handleNetworkChanged);
        }
      };
    }
  }, [activate, activate, error, suppress])
}