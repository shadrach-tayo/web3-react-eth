import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import useSWR from 'swr';
import { useEffect } from 'react';
import { formatEther } from '@ethersproject/units';


const EthBalance = () => {
  const { account, library, chainId } = useWeb3React<Web3Provider>();
  const { data: balance, mutate } = useSWR(['getBalance', account, 'latest'])

  useEffect(() => {
    // listen for changes on an ethereum address
    library?.on('block', () => {
      console.log('update balance ')
      mutate(undefined, true);
    })

    return () => {
      console.log('remove listeners ');
      library?.removeAllListeners('block');
    }
  }, [])


  useEffect(() => {
    console.log('update eth balance ')
    mutate(undefined, true)
  }, [chainId, mutate])

  if (!balance) return <div>loading...</div>
  return (
    <div>Ξ {parseFloat(formatEther(balance)).toPrecision(5)}</div>
  )
}

export default EthBalance;