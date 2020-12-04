<script lang="ts">
  import { firebase } from '@/plugins/firebase'
  import 'firebase/auth'
  import { push } from 'svelte-spa-router'
  import {
    Button,
    Card,
    CardText,
    CardTitle,
    TextField,
  } from 'svelte-materialify'

  let loading = false
  let form = {
    email: '',
    password: '',
  }
  async function login() {
    loading = true
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(form.email, form.password)
      push('/')
    } catch (err) {
      console.error(err)
    } finally {
      loading = false
    }
  }

  async function logout() {
    await firebase.auth().signOut()
  }
</script>

<main class="container">
  <div class="card">
    <Card>
      <CardTitle>ログイン</CardTitle>
      <CardText>
        <form class="form" on:submit|preventDefault={login}>
          <TextField
            bind:value={form.email}
            type="email"
            required
            autocomplete="email"
            outlined>
            メールアドレス
          </TextField>
          <TextField
            bind:value={form.password}
            type="password"
            required
            autocomplete="current-password"
            outlined>
            パスワード
          </TextField>
          <div class="text-right">
            <Button type="submit" class="primary-color" disabled={loading}>
              ログイン
            </Button>
          </div>
        </form>
      </CardText>
    </Card>
  </div>
</main>

<Button on:click={logout}>ログアウト</Button>

<style lang="sass">
.card
  width: 50%
  man-width: 640px
  margin: auto
</style>
