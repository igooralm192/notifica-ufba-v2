import { FirestoreDBClient } from '@/infra/database/firestore/helpers'

export class FirestoreRepository {
  get client() {
    return FirestoreDBClient.getInstance().client
  }
}
