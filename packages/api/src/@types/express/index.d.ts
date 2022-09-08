/**
 * Extends Express request to have also a custom context
 */
declare namespace Express {
  export interface Request {
    context?: any
  }
}
