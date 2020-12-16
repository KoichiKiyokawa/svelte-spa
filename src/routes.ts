import { firebase } from '@/plugins/firebase'
import type { SvelteComponent } from 'svelte'
import { push } from 'svelte-spa-router'
import { wrap } from 'svelte-spa-router/wrap'

import Dashboard from './routes/index.svelte'
import Login from './routes/login.svelte'

export const routes = {
  '/': withAuth(Dashboard),
  '/login': Login,
}

function withAuth(component: typeof SvelteComponent) {
  return wrap({ component, conditions: [redirectIfNotLoggedIn] })
}

async function redirectIfNotLoggedIn() {
  try {
    await new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) reject()
        resolve(user)
      })
    })
    return true
  } catch {
    push('#/login')
    return false
  }
}
