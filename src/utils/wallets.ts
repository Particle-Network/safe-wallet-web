import { WALLET_KEYS } from '@/hooks/wallets/consts'
import { type ConnectedWallet } from '@/hooks/wallets/useOnboard'
import { getWeb3ReadOnly, isSmartContract } from '@/hooks/wallets/web3'
import { ONBOARD_MPC_MODULE_LABEL } from '@/services/mpc/SocialLoginModule'
import type { EthersError } from '@/utils/ethers-utils'
import memoize from 'lodash/memoize'

const isWCRejection = (err: Error): boolean => {
  return /rejected/.test(err?.message)
}

const isEthersRejection = (err: EthersError): boolean => {
  return err.code === 'ACTION_REJECTED'
}

export const isWalletRejection = (err: EthersError | Error): boolean => {
  return isEthersRejection(err as EthersError) || isWCRejection(err)
}

export const isLedger = (wallet: ConnectedWallet): boolean => {
  return wallet.label.toUpperCase() === WALLET_KEYS.LEDGER
}

export const isSmartContractWallet = memoize(
  async (_chainId: string, address: string) => {
    const provider = getWeb3ReadOnly()

    if (!provider) {
      throw new Error('Provider not found')
    }

    return isSmartContract(provider, address)
  },
  (chainId, address) => chainId + address,
)

/* Check if the wallet is unlocked. */
export const isWalletUnlocked = async (walletName: string): Promise<boolean | undefined> => {
  const METAMASK = 'MetaMask'

  // Only MetaMask exposes a method to check if the wallet is unlocked
  if (walletName === METAMASK) {
    if (typeof window === 'undefined' || !window.ethereum?._metamask) return false
    try {
      return await window.ethereum?._metamask.isUnlocked()
    } catch {
      return false
    }
  }

  // Don't reconnect to MPC wallet because it's not initialized right away
  if (walletName === ONBOARD_MPC_MODULE_LABEL) {
    return false
  }
}
