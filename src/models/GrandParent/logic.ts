import type { TGrandParent } from './type'

/**
 * GrandParentに関するロジックを記述する
 * @example new GrandParentLogic(data).isSenior()
 */
export class GrandParentLogic {
  constructor(private data: TGrandParent) {}

  isSenior() {
    return this.data.age >= 65
  }
}
