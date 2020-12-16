<script lang="ts">
  import { GrandParentRepository } from '@/models/GrandParent/repository'
  import type { TGrandParent } from '@/models/GrandParent/type'

  import { firebase, functions } from '@/plugins/firebase'
  import { onMount } from 'svelte'
  import { Button } from 'svelte-materialify'
  import { push } from 'svelte-spa-router'

  let grandParent: TGrandParent | null
  onMount(async () => {
    grandParent = await new GrandParentRepository('Eg7UMtB2sEiJRKklOsLx').find()
    console.log(grandParent)
    functions.httpsCallable('getGrandParent')({ id: 'Eg7UMtB2sEiJRKklOsLx' })
  })

  async function logout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        push('/login')
      })
      .catch(console.error)
  }
</script>

<h1>Dashboard</h1>
<Button on:click={logout}>ログアウト</Button>
