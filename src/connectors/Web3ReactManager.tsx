import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import useEagerConnect from "../hooks/useEagerConnect";
import useInActiveListener from "../hooks/useInActiveListener";

export default function Web3ReactManager({ children }: any) {
  const {active, error: networkError, connector } = useWeb3React<Web3Provider>();
  const [activatingConnector, setActivatingConnector] = useState();

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);


  // connect once or face issues :)
  const triedEager = useEagerConnect();
  // useInActiveListener 
  useInActiveListener(!triedEager || !!activatingConnector);

  // if the account context isn't active, and there's an error on the network context, it's an irrecoverable error
  if (triedEager && !active && networkError) {
    return (
      <p>    Oops! An unknown error occurred. Please refresh the page, or visit from another browser or device.</p>
    )
  }
  
  return children;
}