import { IDBClient } from '@/application/protocols'

import { Firestore, getFirestore } from 'firebase-admin/firestore'

export class FirestoreDBClient implements IDBClient<Firestore> {
  private static instance?: FirestoreDBClient

  private _client = getFirestore()

  static getInstance(): FirestoreDBClient {
    if (!FirestoreDBClient.instance)
      FirestoreDBClient.instance = new FirestoreDBClient()

    return FirestoreDBClient.instance
  }

  get client(): Firestore {
    return this._client
  }

  async connect(): Promise<void> {}

  async disconnect(): Promise<void> {}
}
