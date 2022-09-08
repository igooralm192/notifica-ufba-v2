import {
  ICompareHashCryptography,
  IGenerateHashCryptography,
} from '@/data/contracts'
import { BcryptHashCryptography } from '@/infra/cryptography/bcrypt'

type IHashCryptography = IGenerateHashCryptography & ICompareHashCryptography

export const makeHashCryptography = (): IHashCryptography => {
  return new BcryptHashCryptography()
}
