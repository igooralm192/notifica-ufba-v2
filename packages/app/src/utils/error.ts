import { BaseError } from '@/helpers'

export function assertIsError(error: unknown): asserts error is Error {
  if (!(error instanceof Error)) {
    throw error
  }
}

export function assertIsBaseError(error: unknown): asserts error is BaseError {
  if (!(error instanceof BaseError)) {
    throw error
  }
}
