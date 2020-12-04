<script lang="ts">
  import { onMount } from 'svelte'
  import { MaterialApp } from 'svelte-materialify'
  import Router from 'svelte-spa-router'
  import { routes } from './routes'
</script>

<MaterialApp theme="light">
  <Router {routes} />
</MaterialApp>
