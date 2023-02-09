import { IStorageService } from '@/data/contracts'

import { Storage, getStorage } from 'firebase-admin/storage'
import mime from 'mime-types'
import { URL } from 'url'

export const resolveContentType = (filename: string): string | null => {
  return mime.lookup(filename) || null
}

export class GCSStorageService
  implements IStorageService.Save, IStorageService.GetFileUrl
{
  private client: Storage
  private readonly BASE_URL = 'https://storage.googleapis.com'

  constructor() {
    this.client = getStorage()
  }

  async save({
    path,
    file,
  }: IStorageService.Save.Input): Promise<IStorageService.Save.Output> {
    const bucket = this.client.bucket()

    await bucket.makePublic()

    const fileContentType = resolveContentType(file.originalName)

    const blob = bucket.file(`${path}/${file.destinationName}`)
    const blobStream = blob.createWriteStream({
      resumable: false,
      contentType: fileContentType,
    })

    return new Promise((resolve, reject) => {
      blobStream
        .on('finish', () => {
          const publicUrl = new URL(`${this.BASE_URL}/${bucket.name}/${blob.name}`)
          resolve({ url: publicUrl.toString() })
        })
        .on('error', () => {
          reject(`Unable to upload file, something went wrong`)
        })
        .end(file.buffer)
    })
  }

  async getFileUrl({
    path,
    filename
  }: IStorageService.GetFileUrl.Input): Promise<IStorageService.GetFileUrl.Output> {
    const bucket = this.client.bucket()

    const [fileExists] = await bucket.file(`${path}/${filename}`).exists()

    return {
      url: fileExists
        ? `${this.BASE_URL}/${bucket.name}/${path}/${filename}`
        : undefined,
    }
  }
}
