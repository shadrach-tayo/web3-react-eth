import './App.css';
import { useWeb3React, Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import EthBalance from './components/EthBalance';
import { TokenList } from './components/TokenList';
import { SWRConfig } from 'swr';
// import { fetcher } from './utils';
import fetcher from 'swr-eth';
import { useEffect, useMemo, useState } from 'react';
import { IERC20, TOKENS_BY_NETWORK } from './contants';
import useEagerConnect from './hooks/useEagerConnect';
import { injectedConnector } from './connectors';
import useInActiveListener from './hooks/useInActiveListener';
import Web3ReactManager from './connectors/Web3ReactManager';

const getLibrary = (provider: any): Web3Provider => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12_000;
  return library;
}

const Wallet = () => {
  const { chainId, activate, active, account, library } = useWeb3React<Web3Provider>();

  const onClick = () => {
    activate(injectedConnector);
  }

  const ABIs = useMemo(() => {
    return (TOKENS_BY_NETWORK[chainId] || []).map<[string, any]>(({ address, abi }: IERC20) => ([address, abi]))
  }, [chainId]);

  // const [activatingConnector, setActivatingConnector] = useState();
  // useEffect(() => {
  //   if (activatingConnector && activatingConnector === connector) {
  //     setActivatingConnector(undefined);
  //   }
  // }, [activatingConnector, connector]);

  // // connect once or face issues :)
  // const triedEager = useEagerConnect();
  // // useInActiveListener 
  // useInActiveListener(!triedEager || !!activatingConnector);

  return (
    <div>
      <div>ChainId: {chainId}</div>
      <div>Account: {account}</div>
      {active ? (
        <div>✅ </div>
      ) : (
        <button type="button" onClick={onClick}>
          Connect
        </button>
      )}
      {active && (
        <SWRConfig value={{ fetcher: fetcher(library, new Map(ABIs)) }}>
          <EthBalance />
          <TokenList chainId={chainId} />
        </SWRConfig>
      )}

    </div>
  );
}

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ReactManager>
        <Wallet />
      </Web3ReactManager>
    </Web3ReactProvider>
  );
}

export default App;
