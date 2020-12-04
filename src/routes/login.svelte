<script lang="ts">
  import {
    Button,
    Card,
    CardText,
    CardTitle,
    TextField,
  } from 'svelte-materialify'
</script>

<main class="container">
  <div class="card">
    <Card>
      <CardTitle>ログイン</CardTitle>
      <CardText>
        <form class="form">
          <TextField type="email" required autocomplete="email" outlined>
            メールアドレス
          </TextField>
          <TextField
            type="password"
            required
            autocomplete="current-password"
            outlined>
            パスワード
          </TextField>
          <div class="text-right">
            <Button type="submit" class="primary-color">ログイン</Button>
          </div>
        </form>
      </CardText>
    </Card>
  </div>
</main>

<style lang="sass">
.card
  width: 50%
  man-width: 640px
  margin: auto
</style>
