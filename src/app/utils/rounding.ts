import { ethers } from 'ethers'

type PrintableToken =
  | {
      decimals: number
      symbol: string
      value: bigint
    }
  | undefined

export function formatDecimals(token: PrintableToken, decimals: number) {
  if (!token) return '0.0000'

  const balance = ethers.formatUnits(token.value)
  const drift = token.decimals - decimals

  return balance.substring(0, balance.length - drift)
}
