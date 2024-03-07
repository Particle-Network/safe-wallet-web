// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect'
import { TextDecoder, TextEncoder } from 'util'

const mockOnboardState = {
  chains: [],
  walletModules: [],
  wallets: [],
  accountCenter: {},
}

// to avoid failing tests in some environments
const NumberFormat = Intl.NumberFormat
const englishTestLocale = 'en'

// `viem` used by the `safe-apps-sdk` uses `TextEncoder` and `TextDecoder` which are not available in jsdom for some reason
Object.assign(global, { TextDecoder, TextEncoder })

jest.spyOn(Intl, 'NumberFormat').mockImplementation((locale, ...rest) => new NumberFormat([englishTestLocale], ...rest))

// This is required for jest.spyOn to work with imported modules.
// After Next 13, imported modules have `configurable: false` for named exports,
// which means that `jest.spyOn` cannot modify the exported function.
const defineProperty = Object.defineProperty
Object.defineProperty = (obj, prop, desc) => {
  if (prop !== 'prototype') {
    desc.configurable = true
  }
  return defineProperty(obj, prop, desc)
}

// We need this, otherwise jest will fail with:
// invalid BytesLike value on createRandom
// https://github.com/ethers-io/ethers.js/issues/4365
Object.defineProperty(Uint8Array, Symbol.hasInstance, {
  value(potentialInstance) {
    return this === Uint8Array
      ? Object.prototype.toString.call(potentialInstance) === '[object Uint8Array]'
      : Uint8Array[Symbol.hasInstance].call(this, potentialInstance)
  },
})
