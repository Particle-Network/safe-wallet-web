import { Errors, logError } from '@/services/exceptions'
import { getChainsConfig, type ChainInfo } from '@safe-global/safe-gateway-typescript-sdk'
import { useEffect } from 'react'
import useAsync, { type AsyncResult } from '../useAsync'
import { Merlin, MerlinTestnet } from '@particle-network/chains'
const getConfigs = async (): Promise<ChainInfo[]> => {
  const data = await getChainsConfig()
  const newMerlin = {
    chainId: Merlin.id.toString(),
    chainName: Merlin.name,
    description: Merlin.fullname,
    chainLogoUri: Merlin.icon,
    l2: false,
    isTestnet: false,
    nativeCurrency: {
      name: Merlin.nativeCurrency.name,
      symbol: Merlin.nativeCurrency.symbol,
      decimals: Merlin.nativeCurrency.decimals,
      logoUri: Merlin.nativeIcon,
    },
    transactionService: Merlin.rpcUrl,
    blockExplorerUriTemplate: {
      address: Merlin.blockExplorerUrl?.replace(/\/$/, '') + '/address/{{address}}',
      txHash: Merlin.blockExplorerUrl?.replace(/\/$/, '') + '/tx/{{txHash}}',
      api:
        Merlin.blockExplorerUrl?.replace(/\/$/, '') +
        '/api?module={{module}}&action={{action}}&address={{address}}&apiKey={{apiKey}}',
    },
    disabledWallets: [],
    ensRegistryAddress: '',
    features: [],
    gasPrice: [],
    publicRpcUri: {
      authentication: 'NO_AUTHENTICATION',
      value: Merlin.rpcUrl,
    },
    rpcUri: {
      authentication: 'API_KEY_PATH',
      value: Merlin.rpcUrl,
    },
    safeAppsRpcUri: {
      authentication: 'API_KEY_PATH',
      value: Merlin.rpcUrl,
    },
    shortName: 'ml',
    theme: {
      textColor: '#ffffff',
      backgroundColor: '#B8AAD5',
    },
  }
  const newMerlinTestnet = {
    chainId: MerlinTestnet.id.toString(),
    chainName: MerlinTestnet.name,
    description: MerlinTestnet.fullname,
    chainLogoUri: MerlinTestnet.icon,
    l2: false,
    isTestnet: true,
    nativeCurrency: {
      name: MerlinTestnet.nativeCurrency.name,
      symbol: MerlinTestnet.nativeCurrency.symbol,
      decimals: MerlinTestnet.nativeCurrency.decimals,
      logoUri: MerlinTestnet.nativeIcon,
    },
    transactionService: MerlinTestnet.rpcUrl,
    blockExplorerUriTemplate: {
      address: MerlinTestnet.blockExplorerUrl?.replace(/\/$/, '') + '/address/{{address}}',
      txHash: MerlinTestnet.blockExplorerUrl?.replace(/\/$/, '') + '/tx/{{txHash}}',
      api:
        MerlinTestnet.blockExplorerUrl?.replace(/\/$/, '') +
        '/api?module={{module}}&action={{action}}&address={{address}}&apiKey={{apiKey}}',
    },
    disabledWallets: [],
    ensRegistryAddress: '',
    features: [],
    gasPrice: [],
    publicRpcUri: {
      authentication: 'NO_AUTHENTICATION',
      value: MerlinTestnet.rpcUrl,
    },
    rpcUri: {
      authentication: 'API_KEY_PATH',
      value: MerlinTestnet.rpcUrl,
    },
    safeAppsRpcUri: {
      authentication: 'API_KEY_PATH',
      value: MerlinTestnet.rpcUrl,
    },
    shortName: 'mlt',
    theme: {
      textColor: '#ffffff',
      backgroundColor: '#B8AAD5',
    },
  }

  return (data.results || []).concat(newMerlin as any).concat(newMerlinTestnet as any)
}

export const useLoadChains = (): AsyncResult<ChainInfo[]> => {
  const [data, error, loading] = useAsync<ChainInfo[]>(getConfigs, [])

  // Log errors
  useEffect(() => {
    if (error) {
      logError(Errors._620, error.message)
    }
  }, [error])

  return [data, error, loading]
}

export default useLoadChains
