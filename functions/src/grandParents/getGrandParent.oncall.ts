import { awakableOncall } from '@/utils/baseBuiilder'
import { GrandParentRepository } from '@/models/GrandParent'

type Data = { id: string }

export const getGrandParent = awakableOncall<Data>(
  (data) => {
    return new GrandParentRepository(data.id).find()
  },
  { auth: true }
)
