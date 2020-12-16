import type { firebase } from '@/plugins/firebase'
import { BaseRepository } from '../BaseRepository'
import { GrandParentRepository } from '../GrandParent/repository'
import type { TParent } from './type'

export class ParentRepository extends BaseRepository<TParent> {
  constructor(grandParentID: string, id?: string) {
    super()
    this.collectionReference = new GrandParentRepository(grandParentID).documentReference?.collection(
      'parents'
    ) as firebase.firestore.CollectionReference<TParent>
    if (id) this.documentReference = this.collectionReference.doc(id)
  }
}
