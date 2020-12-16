import type { firebase } from '@/plugins/firebase'
import { BaseRepository } from '../BaseRepository'
import { ParentRepository } from '../Parent/repository'
import type { TChild } from './type'

export class ChildRepository extends BaseRepository<TChild> {
  constructor(grandParentID: string, parentID: string, id?: string) {
    super()
    this.collectionReference = new ParentRepository(grandParentID, parentID).documentReference?.collection(
      'chilren'
    ) as firebase.firestore.CollectionReference<TChild>
    if (id) this.documentReference = this.collectionReference.doc(id)
  }
}
