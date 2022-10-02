export type IHttpRequestBody<B = any> = {
  body: B
}

export type IHttpRequestParams<P = any> = {
  params: P
}

export type IHttpRequestQuery<Q = any> = {
  query: Q
}

export type IHttpRequestBodyAndParams<B = any, P = any> = IHttpRequestBody<B> & IHttpRequestParams<P>
