export type Request<
  Body = any,
  Query = any,
  Params = any,
  Context = { userId?: string; studentId?: string },
  Headers = Record<string, any>,
> = {
  body?: Body
  query?: Query
  params?: Params
  context?: Context
  headers?: Headers
}

export type Response<Body = any> = {
  statusCode: number
  body: Body
}
