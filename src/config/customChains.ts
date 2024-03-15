import { EthereumSepolia } from '@particle-network/chains'

export enum ContractNetworksType {
  safeSingletonAddress = 'safeSingletonAddress',
  safeProxyFactoryAddress = 'safeProxyFactoryAddress',
  multiSendAddress = 'multiSendAddress',
  multiSendCallOnlyAddress = 'multiSendCallOnlyAddress',
  fallbackHandlerAddress = 'fallbackHandlerAddress',
  signMessageLibAddress = 'signMessageLibAddress',
  createCallAddress = 'createCallAddress',
  simulateTxAccessorAddress = 'simulateTxAccessorAddress',
  tokenCallbackAddress = 'tokenCallbackAddress',
  safeL2SingletonAddress = 'safeL2SingletonAddress',
}

export const customChains = [
  // {
  //   chainId: Merlin.id.toString(),
  //   chainName: Merlin.name,
  //   description: Merlin.fullname,
  //   chainLogoUri: Merlin.icon,
  //   l2: true,
  //   isTestnet: false,
  //   nativeCurrency: {
  //     name: Merlin.nativeCurrency.name,
  //     symbol: Merlin.nativeCurrency.symbol,
  //     decimals: Merlin.nativeCurrency.decimals,
  //     logoUri: Merlin.nativeIcon,
  //   },
  //   transactionService: Merlin.rpcUrl,
  //   blockExplorerUriTemplate: {
  //     address: Merlin.blockExplorerUrl?.replace(/\/$/, '') + '/address/{{address}}',
  //     txHash: Merlin.blockExplorerUrl?.replace(/\/$/, '') + '/tx/{{txHash}}',
  //     api:
  //       Merlin.blockExplorerUrl?.replace(/\/$/, '') +
  //       '/api?module={{module}}&action={{action}}&address={{address}}&apiKey={{apiKey}}',
  //   },
  //   disabledWallets: [],
  //   ensRegistryAddress: '',
  //   features: [],
  //   gasPrice: [],
  //   publicRpcUri: {
  //     authentication: 'NO_AUTHENTICATION',
  //     value: Merlin.rpcUrl,
  //   },
  //   rpcUri: {
  //     authentication: 'API_KEY_PATH',
  //     value: Merlin.rpcUrl,
  //   },
  //   safeAppsRpcUri: {
  //     authentication: 'API_KEY_PATH',
  //     value: Merlin.rpcUrl,
  //   },
  //   shortName: 'ml',
  //   theme: {
  //     textColor: '#ffffff',
  //     backgroundColor: '#B8AAD5',
  //   },
  // },
  // {
  //   chainId: MerlinTestnet.id.toString(),
  //   chainName: MerlinTestnet.name,
  //   description: MerlinTestnet.fullname,
  //   chainLogoUri: MerlinTestnet.icon,
  //   l2: true,
  //   isTestnet: true,
  //   nativeCurrency: {
  //     name: MerlinTestnet.nativeCurrency.name,
  //     symbol: MerlinTestnet.nativeCurrency.symbol,
  //     decimals: MerlinTestnet.nativeCurrency.decimals,
  //     logoUri: MerlinTestnet.nativeIcon,
  //   },
  //   transactionService: MerlinTestnet.rpcUrl,
  //   blockExplorerUriTemplate: {
  //     address: MerlinTestnet.blockExplorerUrl?.replace(/\/$/, '') + '/address/{{address}}',
  //     txHash: MerlinTestnet.blockExplorerUrl?.replace(/\/$/, '') + '/tx/{{txHash}}',
  //     api:
  //       MerlinTestnet.blockExplorerUrl?.replace(/\/$/, '') +
  //       '/api?module={{module}}&action={{action}}&address={{address}}&apiKey={{apiKey}}',
  //   },
  //   disabledWallets: [],
  //   ensRegistryAddress: '',
  //   features: [],
  //   gasPrice: [],
  //   publicRpcUri: {
  //     authentication: 'NO_AUTHENTICATION',
  //     value: MerlinTestnet.rpcUrl,
  //   },
  //   rpcUri: {
  //     authentication: 'NO_AUTHENTICATION',
  //     value: MerlinTestnet.rpcUrl,
  //   },
  //   safeAppsRpcUri: {
  //     authentication: 'NO_AUTHENTICATION',
  //     value: MerlinTestnet.rpcUrl,
  //   },
  //   shortName: 'mlt',
  //   theme: {
  //     textColor: '#ffffff',
  //     backgroundColor: '#B8AAD5',
  //   },
  // },
  {
    chainId: EthereumSepolia.id.toString(),
    chainName: EthereumSepolia.name + ' ff',
    description: EthereumSepolia.fullname + ' ff',
    chainLogoUri: EthereumSepolia.icon,
    l2: false,
    isTestnet: true,
    nativeCurrency: {
      name: EthereumSepolia.nativeCurrency.name,
      symbol: EthereumSepolia.nativeCurrency.symbol,
      decimals: EthereumSepolia.nativeCurrency.decimals,
      logoUri: EthereumSepolia.nativeIcon,
    },
    transactionService: EthereumSepolia.rpcUrl,
    blockExplorerUriTemplate: {
      address: EthereumSepolia.blockExplorerUrl?.replace(/\/$/, '') + '/address/{{address}}',
      txHash: EthereumSepolia.blockExplorerUrl?.replace(/\/$/, '') + '/tx/{{txHash}}',
      api:
        EthereumSepolia.blockExplorerUrl?.replace(/\/$/, '') +
        '/api?module={{module}}&action={{action}}&address={{address}}&apiKey={{apiKey}}',
    },
    disabledWallets: [],
    ensRegistryAddress: '',
    features: [],
    gasPrice: [],
    publicRpcUri: {
      authentication: 'NO_AUTHENTICATION',
      value: EthereumSepolia.rpcUrl,
    },
    rpcUri: {
      authentication: 'API_KEY_PATH',
      value: EthereumSepolia.rpcUrl,
    },
    safeAppsRpcUri: {
      authentication: 'API_KEY_PATH',
      value: EthereumSepolia.rpcUrl,
    },
    shortName: 'esaa',
    theme: {
      textColor: '#ffffff',
      backgroundColor: '#B8AAD5',
    },
  },
]

const safeProxyFactoryAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'contract SafeProxy',
        name: 'proxy',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'singleton',
        type: 'address',
      },
    ],
    name: 'ProxyCreation',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_singleton',
        type: 'address',
      },
      {
        internalType: 'bytes',
        name: 'initializer',
        type: 'bytes',
      },
      {
        internalType: 'uint256',
        name: 'saltNonce',
        type: 'uint256',
      },
    ],
    name: 'createChainSpecificProxyWithNonce',
    outputs: [
      {
        internalType: 'contract SafeProxy',
        name: 'proxy',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_singleton',
        type: 'address',
      },
      {
        internalType: 'bytes',
        name: 'initializer',
        type: 'bytes',
      },
      {
        internalType: 'uint256',
        name: 'saltNonce',
        type: 'uint256',
      },
      {
        internalType: 'contract IProxyCreationCallback',
        name: 'callback',
        type: 'address',
      },
    ],
    name: 'createProxyWithCallback',
    outputs: [
      {
        internalType: 'contract SafeProxy',
        name: 'proxy',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_singleton',
        type: 'address',
      },
      {
        internalType: 'bytes',
        name: 'initializer',
        type: 'bytes',
      },
      {
        internalType: 'uint256',
        name: 'saltNonce',
        type: 'uint256',
      },
    ],
    name: 'createProxyWithNonce',
    outputs: [
      {
        internalType: 'contract SafeProxy',
        name: 'proxy',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getChainId',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'proxyCreationCode',
    outputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
]

/**
 * Merlin mainnet
 */
const MerlinContractNetworks: Record<ContractNetworksType | string, any> = {
  safeSingletonAddress: '',
  safeL2SingletonAddress: '0x1A3C3A208C04840E7B55Ec821d593741c3a47153',
  safeProxyFactoryAddress: '0xc203120Fef624d16E11013b37D0365D04c9DaA71',
  multiSendAddress: '0x5714B708910A46FA0D022b6654f6d28e40B72166',
  multiSendCallOnlyAddress: '0x7BeedE3F2f827f1b475714818BC4A1194bE63D89',
  fallbackHandlerAddress: '0x17261C4E181e50305f936765fE44Cf16276f4F40',
  signMessageLibAddress: '0xF017eE1c3086a8C6D6e1aB7160821d03b4F32210',
  createCallAddress: '0x674DD424530BC6a43400d67ee79DeB7E31EC8044',
  simulateTxAccessorAddress: '0xe703EacF42dB02F2e4A48C37ac3123c505609882',
  tokenCallbackAddress: '0x21b857d89A6704F236699F6cc6f1719490BbE108',
}

/**
 * Merlin testnet
 */
const MerlinTestContractNetworks: Record<ContractNetworksType | string, any> = {
  safeSingletonAddress: '0x160eBf15e139D2bC4773923939e6f62994019e11',
  safeL2SingletonAddress: '0x1905b168e2573edD64c5c75D5D3d2384D2bA9c31',
  safeProxyFactoryAddress: '0x552310E340A92E2Ecf7433EA6852D339b4968c51',
  multiSendAddress: '0xB3ADe386Cc586362C393BB4c36f5a800Cd404931',
  multiSendCallOnlyAddress: '0x424EAAeAE9b2Fe9fa2A7FC9884a32D31b7b2183c',
  fallbackHandlerAddress: '0xd7c609dCECE20950F4CAfC2D59411e0d1C462722',
  signMessageLibAddress: '0xF864cd501e6f9Cc99e1e774D42007909bbd239e3',
  createCallAddress: '0x08E722AC6094471A3b9c06D9c359b4D0556CcC0C',
  simulateTxAccessorAddress: '0xC4cC9C574CD790d565099866Eda2b75152d57F25',
  tokenCallbackAddress: '0x27d5910a5b59FAe5DCb81B2386030288224dc7aA',
  safeProxyFactoryAbi,
}

/**
 * Ethereum Sepolia
 */
// const EthereumSepoliaContractNetworks: Record<ContractNetworksType | string, string> = {
//   safeSingletonAddress: '0x69f4D1788e39c87893C980c06EdF4b7f686e2938',
//   safeL2SingletonAddress: '0xfb1bffC9d739B8D520DaF37dF666da4C687191EA',
//   safeProxyFactoryAddress: '0xC22834581EbC8527d974F8a1c97E1bEA4EF910BC',
//   multiSendAddress: '0x998739BFdAAdde7C933B942a68053933098f9EDa',
//   multiSendCallOnlyAddress: '0xA1dabEF33b3B82c7814B6D82A79e50F4AC44102B',
//   fallbackHandlerAddress: '0x017062a1dE2FE6b99BE3d9d37841FeD19F573804',
//   signMessageLibAddress: '0x98FFBBF51bb33A056B08ddf711f289936AafF717',
//   createCallAddress: '0xB19D6FFc2182150F8Eb585b79D4ABcd7C5640A9d',
//   simulateTxAccessorAddress: '0x727a77a074D1E6c4530e814F89E618a3298FC044',
//   tokenCallbackAddress: '',
// }

export const customContractNetworks: Record<string, Record<ContractNetworksType, string>> = {
  4200: MerlinContractNetworks,
  686868: MerlinTestContractNetworks,
  // 11155111: EthereumSepoliaContractNetworks,
}
