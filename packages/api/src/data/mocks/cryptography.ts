import {
  ICompareHashCryptography,
  IDecodeTokenCryptography,
  IGenerateHashCryptography,
  IGenerateTokenCryptography,
} from '@/data/contracts'

export class MockedHashCryptography
  implements IGenerateHashCryptography, ICompareHashCryptography
{
  generate(): Promise<string> {
    throw new Error('Method not implemented.')
  }

  compare(): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
}

// Token

export class MockedTokenCryptography
  implements IGenerateTokenCryptography, IDecodeTokenCryptography
{
  generate(): Promise<string> {
    throw new Error('Method not implemented.')
  }

  decode<T = any>(): Promise<T> {
    throw new Error('Method not implemented.')
  }
}
