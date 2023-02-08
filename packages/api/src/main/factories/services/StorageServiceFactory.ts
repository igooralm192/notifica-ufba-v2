import { IStorageService } from '@/data/contracts'
import { GCSStorageService } from '@/infra/services/gcs/GCSStorageService'

type StorageService = IStorageService.Save & IStorageService.GetFileUrl

export const makeStorageService = (): StorageService => {
  return new GCSStorageService()
}
