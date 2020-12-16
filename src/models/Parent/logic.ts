import type { TParent } from './type'

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
