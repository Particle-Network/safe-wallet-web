import {
  getFallbackHandlerContractDeployment,
  getMultiSendCallOnlyContractDeployment,
  getProxyFactoryContractDeployment,
  getSafeContractDeployment,
  getSignMessageLibContractDeployment,
} from './deployments'
import { LATEST_SAFE_VERSION } from '@/config/constants'
import { ImplementationVersionState } from '@safe-global/safe-gateway-typescript-sdk'
import type { ChainInfo, SafeInfo } from '@safe-global/safe-gateway-typescript-sdk'
import type { GetContractProps, SafeVersion } from '@safe-global/safe-core-sdk-types'
import { assertValidSafeVersion, createEthersAdapter, createReadOnlyEthersAdapter } from '@/hooks/coreSDK/safeCoreSDK'
import type { BrowserProvider } from 'ethers'
import type { EthersAdapter, SafeContractEthers, SignMessageLibEthersContract } from '@safe-global/protocol-kit'
import semver from 'semver'

import type CompatibilityFallbackHandlerEthersContract from '@safe-global/protocol-kit/dist/src/adapters/ethers/contracts/CompatibilityFallbackHandler/CompatibilityFallbackHandlerEthersContract'
import { customContractNetworks, ContractNetworksType } from '@/config/customContractNetworks'

const MerlinTestContract = customContractNetworks['686868']

// `UNKNOWN` is returned if the mastercopy does not match supported ones
// @see https://github.com/safe-global/safe-client-gateway/blob/main/src/routes/safes/handlers/safes.rs#L28-L31
//      https://github.com/safe-global/safe-client-gateway/blob/main/src/routes/safes/converters.rs#L77-L79
export const isValidMasterCopy = (implementationVersionState: SafeInfo['implementationVersionState']): boolean => {
  return implementationVersionState !== ImplementationVersionState.UNKNOWN
}

export const _getValidatedGetContractProps = (
  safeVersion: SafeInfo['version'],
): Pick<GetContractProps, 'safeVersion'> => {
  assertValidSafeVersion(safeVersion)

  // SDK request here: https://github.com/safe-global/safe-core-sdk/issues/261
  // Remove '+L2'/'+Circles' metadata from version
  const [noMetadataVersion] = safeVersion.split('+')

  return {
    safeVersion: noMetadataVersion as SafeVersion,
  }
}

// GnosisSafe

const getGnosisSafeContractEthers = async (safe: SafeInfo, ethAdapter: EthersAdapter): Promise<SafeContractEthers> => {
  debugger
  return ethAdapter.getSafeContract({
    customContractAddress: safe.address.value,
    ..._getValidatedGetContractProps(safe.version),
  })
}

export const getReadOnlyCurrentGnosisSafeContract = async (safe: SafeInfo): Promise<SafeContractEthers> => {
  const ethAdapter = createReadOnlyEthersAdapter()
  return getGnosisSafeContractEthers(safe, ethAdapter)
}

export const getCurrentGnosisSafeContract = async (
  safe: SafeInfo,
  provider: BrowserProvider,
): Promise<SafeContractEthers> => {
  const ethAdapter = await createEthersAdapter(provider)
  return getGnosisSafeContractEthers(safe, ethAdapter)
}

export const getReadOnlyGnosisSafeContract = async (chain: ChainInfo, safeVersion: string = LATEST_SAFE_VERSION) => {
  const ethAdapter = createReadOnlyEthersAdapter()
  const params = {
    singletonDeployment: getSafeContractDeployment(chain, safeVersion),
    ..._getValidatedGetContractProps(safeVersion),
    // customContractAddress: MerlinTestContract[ContractNetworksType.safeSingletonAddress],
    customContractAddress: MerlinTestContract[ContractNetworksType.safeL2SingletonAddress], // ???
  }
  console.log('>>> getReadOnlyGnosisSafeContract', params)

  return ethAdapter.getSafeContract(params)
}

// MultiSend

export const _getMinimumMultiSendCallOnlyVersion = (safeVersion: SafeInfo['version']) => {
  const INITIAL_CALL_ONLY_VERSION = '1.3.0'

  if (!safeVersion) {
    return INITIAL_CALL_ONLY_VERSION
  }

  return semver.gte(safeVersion, INITIAL_CALL_ONLY_VERSION) ? safeVersion : INITIAL_CALL_ONLY_VERSION
}

export const getMultiSendCallOnlyContract = async (
  chainId: string,
  safeVersion: SafeInfo['version'],
  provider: BrowserProvider,
) => {
  const ethAdapter = await createEthersAdapter(provider)
  const multiSendVersion = _getMinimumMultiSendCallOnlyVersion(safeVersion)
  const params = {
    singletonDeployment: getMultiSendCallOnlyContractDeployment(chainId, multiSendVersion),
    ..._getValidatedGetContractProps(safeVersion),
    customContractAddress: MerlinTestContract[ContractNetworksType.multiSendCallOnlyAddress],
  }
  console.log('>>> getMultiSendCallOnlyContract', params)

  return ethAdapter.getMultiSendCallOnlyContract(params)
}

export const getReadOnlyMultiSendCallOnlyContract = async (chainId: string, safeVersion: SafeInfo['version']) => {
  const ethAdapter = createReadOnlyEthersAdapter()
  const multiSendVersion = _getMinimumMultiSendCallOnlyVersion(safeVersion)
  const params = {
    singletonDeployment: getMultiSendCallOnlyContractDeployment(chainId, multiSendVersion),
    ..._getValidatedGetContractProps(safeVersion),
    customContractAddress: MerlinTestContract[ContractNetworksType.multiSendCallOnlyAddress],
  }
  console.log('>>> getReadOnlyMultiSendCallOnlyContract', params)

  return ethAdapter.getMultiSendCallOnlyContract(params)
}

// GnosisSafeProxyFactory

export const getReadOnlyProxyFactoryContract = (chainId: string, safeVersion: SafeInfo['version']) => {
  const ethAdapter = createReadOnlyEthersAdapter()
  const params = {
    singletonDeployment: getProxyFactoryContractDeployment(chainId, safeVersion),
    ..._getValidatedGetContractProps(safeVersion),
    customContractAddress: MerlinTestContract[ContractNetworksType.safeProxyFactoryAddress],
  }
  console.log('>>> getReadOnlyProxyFactoryContract', params)
  return ethAdapter.getSafeProxyFactoryContract(params)
}

// Fallback handler

export const getReadOnlyFallbackHandlerContract = async (
  chainId: string,
  safeVersion: SafeInfo['version'],
): Promise<CompatibilityFallbackHandlerEthersContract> => {
  const ethAdapter = createReadOnlyEthersAdapter()
  const params = {
    singletonDeployment: getFallbackHandlerContractDeployment(chainId, safeVersion),
    ..._getValidatedGetContractProps(safeVersion),
    customContractAddress: MerlinTestContract[ContractNetworksType.fallbackHandlerAddress],
  }
  console.log('>>> getReadOnlyFallbackHandlerContract', params)

  return ethAdapter.getCompatibilityFallbackHandlerContract(params)
}

// Sign messages deployment

export const getReadOnlySignMessageLibContract = async (
  chainId: string,
  safeVersion: SafeInfo['version'],
): Promise<SignMessageLibEthersContract> => {
  const ethAdapter = createReadOnlyEthersAdapter()
  const params = {
    singletonDeployment: getSignMessageLibContractDeployment(chainId, safeVersion),
    ..._getValidatedGetContractProps(safeVersion),
    customContractAddress: MerlinTestContract[ContractNetworksType.signMessageLibAddress],
  }
  console.log('>>> getReadOnlySignMessageLibContract', params)

  return ethAdapter.getSignMessageLibContract(params)
}
