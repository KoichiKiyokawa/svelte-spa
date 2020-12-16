import * as admin from 'firebase-admin'

const ERRORS: Record<string, (additionalMessage?: string) => Error> = {
  INVALID_ARGS: (additionalMessage?: string) => Error(`invalid args. ${additionalMessage}`),
  NO_PARENT: () => Error(`parent is not set.`),
  NO_COLLECTION_REFERENCE: (additionalMessage?: string) =>
    Error(`This model does not have collectionReference. ${additionalMessage}`),
  NO_DOCUMENT_REFERENCE: (additionalMessage?: string) =>
    Error(`This model does not have documentReference. ${additionalMessage}`),
}

type WithID<T> = T & { id: string }

export class BaseRepository<T extends Record<string, unknown>> {
  collectionReference?: admin.firestore.CollectionReference<T>
  documentReference?: admin.firestore.DocumentReference<T>

  async find(): Promise<WithID<T> | null> {
    const snapshot = await this.documentReference?.get()
    const data = snapshot?.data()
    if (snapshot == null || data == null) return null

    return {
      ...(convertTimestampToDate(data) as T),
      id: snapshot?.id,
    }
  }

  async all(): Promise<WithID<T>[]> {
    if (this.collectionReference == null) throw ERRORS.NO_COLLECTION_REFERENCE

    const snapshot = await this.collectionReference.get()
    return snapshot.docs.flatMap((doc) =>
      doc.exists ? { ...(convertTimestampToDate(doc.data()) as T), id: doc.id } : []
    )
  }

  /**
   *
   * @param data
   * @return id 作成したドキュメントのID
   */
  async create(data: T & { id?: string }): Promise<string> {
    if (this.collectionReference == null) throw ERRORS.NO_COLLECTION_REFERENCE

    const { id, ...addData } = data
    if (id) {
      await this.collectionReference.doc(id).set(addData as T)
      return id
    }

    const addedDocumentReference = await this.collectionReference.add(addData as T)
    return addedDocumentReference.id
  }

  async update(data: Partial<T>): Promise<void> {
    if (this.documentReference == null) throw ERRORS.NO_DOCUMENT_REFERENCE()

    await this.documentReference.update(data)
    return
  }

  async destroy(): Promise<void> {
    if (this.documentReference == null) throw ERRORS.NO_DOCUMENT_REFERENCE()

    await this.documentReference.delete()
    return
  }
}

// オブジェクトに存在するTimestamp型を再帰的にDate型へ変換する
export function convertTimestampToDate(data: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(data).map(([key, val]) => {
      if (val instanceof admin.firestore.Timestamp) return [key, val.toDate()]
      else if (Array.isArray(val))
        return [
          key,
          val.map((v) =>
            v instanceof admin.firestore.Timestamp ? v.toDate() : isObject(v) ? convertTimestampToDate(v) : v
          ),
        ]
      else if (isObject(val)) return [key, convertTimestampToDate(val)]
      else return [key, val]
    })
  )
}

// cf) https://qiita.com/suin/items/e8cf3404161cc90821d8
function isObject(x: unknown): x is Record<string, unknown> {
  if (x === null) return false
  else if (typeof x === 'object') return true
  else return false
}
