import type { SafeAppData } from '@safe-global/safe-gateway-typescript-sdk'

export enum PermissionStatus {
  GRANTED = 'granted',
  PROMPT = 'prompt',
  DENIED = 'denied',
}

const FEATURES = [
  'accelerometer',
  'ambient-light-sensor',
  'autoplay',
  'battery',
  'camera',
  'cross-origin-isolated',
  'display-capture',
  'document-domain',
  'encrypted-media',
  'execution-while-not-rendered',
  'execution-while-out-of-viewport',
  'fullscreen',
  'geolocation',
  'gyroscope',
  'keyboard-map',
  'magnetometer',
  'microphone',
  'midi',
  'navigation-override',
  'payment',
  'picture-in-picture',
  'publickey-credentials-get',
  'screen-wake-lock',
  'sync-xhr',
  'usb',
  'web-share',
  'xr-spatial-tracking',
  'clipboard-read',
  'clipboard-write',
  'gamepad',
  'speaker-selection',
]

type FeaturesType = typeof FEATURES

export type AllowedFeatures = FeaturesType[number]

export const isBrowserFeature = (featureKey: string): featureKey is AllowedFeatures => {
  return FEATURES.includes(featureKey as AllowedFeatures)
}

export type AllowedFeatureSelection = { feature: AllowedFeatures; checked: boolean }

export type SafeAppDataWithPermissions = SafeAppData & { safeAppsPermissions: AllowedFeatures[] }

interface Balance {
  ETH: string
  // 可能还有其他的余额类型，根据实际情况添加
}

interface Account {
  address: string
  ens: string | null
  uns: string | null
  balance: Balance
}

interface WalletData {
  accounts: Account[]
  chains: any[]
  icon: string
  instance: string
  label: string
  provider: any
  switchChain: any
}

export interface WalletAPI {
  data: {
    wallets: WalletData[]
  }
  state: {
    get: () => {
      wallets: WalletData[]
    }
  }
}

export interface WalletState {
  label: string
  icon: string
  provider: any
  accounts: any[]
  chains: any[]
  instance?: unknown
}
