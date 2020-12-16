import * as admin from 'firebase-admin'
admin.initializeApp()
import { BaseRepository } from './BaseRepository'
import type { TGrandParent } from '../../../src/models/GrandParent/type'

/**
 * GrandParentに関するデータをDBから取得したり、DBへ保存する処理を書く。
 * 必要に応じてメソッドを追加する。
 *
 * @example ```
 * const grandParent = new GrandParent(id).find() // 1件取得
 * const grandParents = new GrandParent().all() // 全取得
 * const id = new GrandParent().create() // 追加
 * new GrandParent(id).update(data) // 更新
 * new GrandParent(id).destroy() // 削除
 * ```
 */
export class GrandParentRepository extends BaseRepository<TGrandParent> {
  constructor(id?: string) {
    super()
    this.collectionReference = admin
      .firestore()
      .collection('grandParents') as admin.firestore.CollectionReference<TGrandParent>
    if (id) this.documentReference = this.collectionReference.doc(id)
  }
}
