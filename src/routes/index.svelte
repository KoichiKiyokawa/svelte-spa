<script lang="ts">
  import { firebase } from '@/plugins/firebase'
  import { Button } from 'svelte-materialify'
  import { push } from 'svelte-spa-router'

  async function logout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        push('#/login')
      })
      .catch(console.error)
  }
</script>

<h1>Dashboard</h1>
<Button on:click={logout}>ログアウト</Button>
