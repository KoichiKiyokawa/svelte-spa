import type { TChild } from './type'

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
