<script lang="ts">
  import Router from 'svelte-spa-router'
  import { MaterialApp } from 'svelte-materialify'

  import { routes } from './routes'
</script>

<MaterialApp theme="light">
  <Router {routes} />
</MaterialApp>
