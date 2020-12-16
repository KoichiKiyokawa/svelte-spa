import { GrandParentRepository } from './models/GrandParent'
import { baseBuilder } from './utils/baseBuiilder'

export const helloWorld = baseBuilder.https.onCall((data) => {
  return new GrandParentRepository(data.id).find()
})
