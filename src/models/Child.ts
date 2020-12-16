import type { firebase } from '@/plugins/firebase'
import { BaseRepository } from './BaseRepository'
import { ParentRepository } from './Parent'

export type TChild = {
  name: string
  age: number
  createdAt: Date
}

export class ChildRepository extends BaseRepository<TChild> {
  constructor(grandParentID: string, parentID: string, id?: string) {
    super()
    super()
    this.collectionReference = new ParentRepository(grandParentID, parentID).documentReference?.collection(
      'chilren'
    ) as firebase.firestore.CollectionReference<TChild>
    if (id) this.documentReference = this.collectionReference.doc(id)
  }
}

/**
 * Childに関するロジックを記述する
 * @example new ChildLogic(data).isSenior()
 */
export class ChildLogic {
  constructor(private data: TChild) {}

  isAdult() {
    return this.data.age >= 20
  }
}
