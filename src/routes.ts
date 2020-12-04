import { firebase } from '@/plugins/firebase'
import { push } from 'svelte-spa-router'
import { wrap } from 'svelte-spa-router/wrap'
import Dashboard from './routes/index.svelte'
import Login from './routes/login.svelte'

export const routes = {
  '/': wrap({ component: Dashboard, conditions: [redirectIfNotLoggedIn] }),
  '/login': Login,
}

async function redirectIfNotLoggedIn() {
  try {
    await new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) reject()
        resolve()
      })
    })
    return true
  } catch {
    push('#/login')
    return false
  }
}
