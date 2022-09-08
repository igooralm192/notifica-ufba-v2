export interface IDBClient<T = void> {
  client: T
  connect(): Promise<void>
  disconnect(): Promise<void>
}
