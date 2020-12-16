import type { firebase } from '@/plugins/firebase'
import { BaseRepository } from './BaseRepository'
import { GrandParentRepository } from './GrandParent'

export type TParent = {
  name: string
  age: number
  createdAt: Date
}

export class ParentRepository extends BaseRepository<TParent> {
  constructor(grandParentID: string, id?: string) {
    super()
    this.collectionReference = new GrandParentRepository(grandParentID).documentReference?.collection(
      'parents'
    ) as firebase.firestore.CollectionReference<TParent>
    if (id) this.documentReference = this.collectionReference.doc(id)
  }
}

/**
 * Parentに関するロジックを記述する
 * @example new ParentLogic(data).isSenior()
 */
export class ParentLogic {
  constructor(private data: TParent) {}

  isSenior() {
    return this.data.age >= 65
  }
}
