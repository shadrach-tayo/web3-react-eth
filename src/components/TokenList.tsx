import { TOKENS_BY_NETWORK } from "../contants"
import TokenBalance from "./TokenBalance"

export const TokenList = ({ chainId }: { chainId: any }) => {
  console.log('chainId ', chainId);
  return (
    <>
      {TOKENS_BY_NETWORK[chainId]?.map((token) => (
        <TokenBalance key={token.address} {...token} />
      ))}
    </>
  )
}