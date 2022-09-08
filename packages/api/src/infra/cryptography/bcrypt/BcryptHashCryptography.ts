import {
  IGenerateHashCryptography,
  ICompareHashCryptography,
} from '@/data/contracts'

import bcrypt from 'bcryptjs'

export class BcryptHashCryptography
  implements IGenerateHashCryptography, ICompareHashCryptography
{
  // TODO: Set SALT based on .env
  constructor(public readonly SALT = 10) {}

  generate({
    payload,
  }: IGenerateHashCryptography.Input): Promise<IGenerateHashCryptography.Output> {
    return bcrypt.hash(payload, this.SALT)
  }

  compare({
    payload,
    hashed,
  }: ICompareHashCryptography.Input): Promise<ICompareHashCryptography.Output> {
    return bcrypt.compare(payload, hashed)
  }
}
