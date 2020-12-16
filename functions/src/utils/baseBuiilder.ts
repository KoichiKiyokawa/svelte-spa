import * as functions from 'firebase-functions'
import { checkAuth } from './checkAuth'

export const baseBuilder = functions.region('asia-northeast1')

export function awakableOncall<T>(
  func: (data: T, context?: functions.https.CallableContext) => any,
  options: { auth: boolean }
): ReturnType<typeof functions.https.onCall> | void {
  return baseBuilder.https.onCall((data: T & { awakeRun?: boolean }, context) => {
    if (data.awakeRun) return { message: 'awaked' }

    if (options.auth) {
      checkAuth(context)
    }

    return func(data, context)
  })
}
