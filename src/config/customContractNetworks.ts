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
  safeProxyFactoryAbi = 'safeProxyFactoryAbi',
}
const safeProxyFactoryAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'contract GnosisSafeProxy',
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
    name: 'calculateCreateProxyWithNonceAddress',
    outputs: [
      {
        internalType: 'contract GnosisSafeProxy',
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
        name: 'singleton',
        type: 'address',
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes',
      },
    ],
    name: 'createProxy',
    outputs: [
      {
        internalType: 'contract GnosisSafeProxy',
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
        internalType: 'contract GnosisSafeProxy',
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
        internalType: 'contract GnosisSafeProxy',
        name: 'proxy',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
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
  {
    inputs: [],
    name: 'proxyRuntimeCode',
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
 * Merlin testnet
 */
const MerlinTestContractNetworks: Record<ContractNetworksType, string | any[]> = {
  /** safeSingletonAddress - Address of the Safe Singleton contract deployed on a specific network */
  safeSingletonAddress: '0x160eBf15e139D2bC4773923939e6f62994019e11',
  /** safeProxyFactoryAddress - Address of the SafeProxyFactory contract deployed on a specific network */
  safeProxyFactoryAddress: '0x552310E340A92E2Ecf7433EA6852D339b4968c51',
  /** multiSendAddress - Address of the MultiSend contract deployed on a specific network */
  multiSendAddress: '0xB3ADe386Cc586362C393BB4c36f5a800Cd404931',
  /** multiSendCallOnlyAddress - Address of the MultiSendCallOnly contract deployed on a specific network */
  multiSendCallOnlyAddress: '0x424EAAeAE9b2Fe9fa2A7FC9884a32D31b7b2183c',
  /** fallbackHandlerAddress - Address of the Fallback Handler contract deployed on a specific network */
  fallbackHandlerAddress: '0xd7c609dCECE20950F4CAfC2D59411e0d1C462722',
  /** signMessageLibAddress - Address of the SignMessageLib contract deployed on a specific network */
  signMessageLibAddress: '0xF864cd501e6f9Cc99e1e774D42007909bbd239e3',
  /** createCallAddress - Address of the CreateCall contract deployed on a specific network */
  createCallAddress: '0x08E722AC6094471A3b9c06D9c359b4D0556CcC0C',
  /** simulateTxAccessorAddress - Address of the SimulateTxAccessor contract deployed on a specific network */
  simulateTxAccessorAddress: '0xC4cC9C574CD790d565099866Eda2b75152d57F25',
  tokenCallbackAddress: '0x27d5910a5b59FAe5DCb81B2386030288224dc7aA',

  safeL2SingletonAddress: '0x1905b168e2573edD64c5c75D5D3d2384D2bA9c31',

  // safeProxyFactoryAbi,
}

export const customContractNetworks = {
  686868: MerlinTestContractNetworks,
}
