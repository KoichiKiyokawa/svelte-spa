import * as functions from 'firebase-functions'
import { CallableContext } from 'firebase-functions/lib/providers/https'

export const checkAuth = (context: CallableContext): void => {
  if (context.auth == null) throw new functions.https.HttpsError('internal', 'has not logged in')
}
