import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { injectedConnector } from "../connectors";


export default function useEagerConnect() {
  const { active, activate } = useWeb3React<Web3Provider>();
  const [tried, setTried] = useState(false);

  useEffect(() => {

    // injector logic
    injectedConnector.isAuthorized().then((isAuthorized: boolean) => {
      if(isAuthorized) {
        activate(injectedConnector, null,true)
          .catch(e => {
            console.log('Injected connector auth error: ', e);
            setTried(true);
          })
      } else {
        setTried(true);
      }
    })

  }, [activate])

  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }
  }, [tried, active])

  return tried;
}