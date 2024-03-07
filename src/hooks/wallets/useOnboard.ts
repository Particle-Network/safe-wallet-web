import type { WalletState, WalletAPI } from '@/components/safe-apps/types'
import ExternalStore from '@/services/ExternalStore'
import { Errors, logError } from '@/services/exceptions'
import { checksumAddress } from '@/utils/addresses'
import { formatAmount } from '@/utils/formatNumber'
import type { Eip1193Provider } from 'ethers'
import { getAddress } from 'ethers'

export type ConnectedWallet = {
  label: string
  chainId: string
  address: string
  ens?: string
  provider: Eip1193Provider
  icon?: string
  balance?: string
  switchChain?: any
}

const { getStore, setStore, useStore } = new ExternalStore<WalletAPI>()

export const initOnboard = async (currentAccount: string, chain: any, provider: any, switchChain: any) => {
  const stateData = {
    wallets: [
      {
        accounts: [
          {
            address: checksumAddress(currentAccount),
            ens: null,
          },
        ],
        chains: [{ ...chain, id: chain.chainId }],
        instance: '',
        label: '',
        provider,
        switchChain,
      },
    ],
  }
  setStore({
    data: stateData,
    state: {
      get: () => {
        return getStore?.()?.data || {}
      },
    },
  } as any)
}

// Get the most recently connected wallet address
export const getConnectedWallet = (wallets: WalletState[]): ConnectedWallet | null => {
  if (!wallets) return null

  const primaryWallet = wallets[0]
  if (!primaryWallet) return null

  const account = primaryWallet.accounts[0]
  if (!account) return null

  let balance = ''
  if (account.balance) {
    const tokenBalance = Object.entries(account.balance)[0]
    const token = tokenBalance?.[0] || ''
    const balanceString = (tokenBalance?.[1] || '') as string
    const balanceNumber = parseFloat(balanceString)
    if (Number.isNaN(balanceNumber)) {
      balance = balanceString
    } else {
      const balanceFormatted = formatAmount(balanceNumber)
      balance = `${balanceFormatted} ${token}`
    }
  }

  try {
    const address = getAddress(account.address)
    return {
      label: primaryWallet.label,
      address,
      ens: account.ens?.name,
      chainId: Number(primaryWallet.chains[0].id).toString(10),
      provider: primaryWallet.provider,
      icon: primaryWallet.icon,
      balance,
      // @ts-ignore
      switchChain: primaryWallet?.switchChain,
    }
  } catch (e) {
    logError(Errors._106, e)
    return null
  }
}

export const connectWallet = async (onboard: WalletAPI, options?: any): Promise<WalletState[] | undefined> => {
  debugger
  return
}

export const getOnboardStore = getStore as () => WalletAPI

export const setOnboardStore = setStore

export default useStore
