import {
  IDecodeTokenCryptography,
  IGenerateTokenCryptography,
} from '@/data/contracts'
import { JwtTokenCryptography } from '@/infra/cryptography/jwt'

type ITokenCryptography = IGenerateTokenCryptography & IDecodeTokenCryptography

export const makeTokenCryptography = (): ITokenCryptography => {
  return new JwtTokenCryptography()
}
