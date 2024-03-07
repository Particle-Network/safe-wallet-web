import { CYPRESS_MNEMONIC, WC_PROJECT_ID } from '@/config/constants'
import type { ChainInfo } from '@safe-global/safe-gateway-typescript-sdk'
import type { WalletInit } from '@web3-onboard/common/dist/types.d'

import coinbaseModule from '@web3-onboard/coinbase'
import injectedWalletModule from '@web3-onboard/injected-wallets'
import walletConnect from '@web3-onboard/walletconnect'

import { SOCIAL_WALLET_OPTIONS } from '@/services/mpc/config'
import e2eWalletModule from '@/tests/e2e-wallet'
import { CGW_NAMES, WALLET_KEYS } from './consts'

const prefersDarkMode = (): boolean => {
  return window?.matchMedia('(prefers-color-scheme: dark)')?.matches
}

const walletConnectV2 = (chain: ChainInfo): WalletInit => {
  // WalletConnect v2 requires a project ID
  if (!WC_PROJECT_ID) {
    return () => null
  }

  return walletConnect({
    version: 2,
    projectId: WC_PROJECT_ID,
    qrModalOptions: {
      themeVariables: {
        '--wcm-z-index': '1302',
      },
      themeMode: prefersDarkMode() ? 'dark' : 'light',
    },
    requiredChains: [parseInt(chain.chainId)],
    dappUrl: location.origin,
  })
}

const WALLET_MODULES: { [key in WALLET_KEYS]: (chain: ChainInfo) => WalletInit } = {
  [WALLET_KEYS.INJECTED]: () => injectedWalletModule(),
  [WALLET_KEYS.WALLETCONNECT_V2]: (chain: any) => walletConnectV2(chain),
  [WALLET_KEYS.COINBASE]: () => coinbaseModule({ darkMode: prefersDarkMode() }),
  [WALLET_KEYS.SOCIAL]: () => {},
  [WALLET_KEYS.LEDGER]: () => {},
  [WALLET_KEYS.TREZOR]: () => {},
  [WALLET_KEYS.KEYSTONE]: () => {},
} as any

export const getAllWallets = (chain: ChainInfo): WalletInit[] => {
  return Object.values(WALLET_MODULES).map((module) => module(chain))
}

export const isWalletSupported = (disabledWallets: string[], walletLabel: string): boolean => {
  const legacyWalletName = CGW_NAMES?.[walletLabel.toUpperCase() as WALLET_KEYS]
  return !disabledWallets.includes(legacyWalletName || walletLabel)
}

export const getSupportedWallets = (chain: ChainInfo): WalletInit[] => {
  if (window.Cypress && CYPRESS_MNEMONIC) {
    return [e2eWalletModule(chain.rpcUri)]
  }
  const enabledWallets = Object.entries(WALLET_MODULES).filter(([key]) => isWalletSupported(chain.disabledWallets, key))

  if (enabledWallets.length === 0) {
    return [WALLET_MODULES.INJECTED(chain)]
  }

  return enabledWallets.map(([, module]) => module(chain))
}

export const isSocialWalletEnabled = (chain: ChainInfo | undefined): boolean => {
  if (Object.keys(SOCIAL_WALLET_OPTIONS).length === 0) return false

  if (!chain) return false

  return chain.disabledWallets.every((label) => label !== CGW_NAMES.SOCIAL_LOGIN)
}
