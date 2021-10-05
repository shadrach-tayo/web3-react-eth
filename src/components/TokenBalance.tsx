/* eslint-disable react-hooks/exhaustive-deps */
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import useSWR from 'swr';
import { fetcher } from '../utils';
import { useEffect } from 'react';
import { formatEther } from '@ethersproject/units';
import { Contract } from '@ethersproject/contracts';
import ERC20ABI from '../abi/ERC20.abi.json';
interface Token {
  symbol: string,
  address: string,
  decimal?: number
}

const TokenBalance = ({ symbol, address, decimal }: Token) => {
  const { account, library } = useWeb3React<Web3Provider>();
  const { data: balance, mutate } = useSWR([address, 'balanceOf', account,]);

  useEffect(() => {
    // listen for changes on an ethereum address
    const contract = new Contract(address, ERC20ABI, library?.getSigner());
    const toMe = contract.filters.Transfer(null, account);
    const fromMe = contract.filters.Transfer(account);

    library?.on(fromMe, (from, to, amount, event) => {
      console.log('Transfer|sent', { from, to, amount, event })
      mutate(undefined, true);
    })

    library?.on(toMe, (from, to, amount, event) => {
      console.log('Transfer|sent', { from, to, amount, event })
      mutate(undefined, true);
    })
    return () => {
      console.log('remove listeners ');
      library?.removeAllListeners(fromMe);
      library?.removeAllListeners(toMe);
    }
  }, [])

  if (!balance) return <div>loading...</div>
  return (
    <div>Ξ {parseFloat(formatEther(balance)).toPrecision(4)}</div>
  )
}

export default TokenBalance;