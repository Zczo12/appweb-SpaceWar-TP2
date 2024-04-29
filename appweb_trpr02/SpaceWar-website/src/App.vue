<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavigationBar from '../src/component/NavigationBar.vue'

</script>

<template>
  <header>
    <NavigationBar />
  </header>
    
    <main>
      <RouterView />
    </main>
    <footer class="container-fluid bg-secondary text-light p-1 mt-3">
      <p class="text-center">Copyright Hubert Beaupré, Jean-Thomas Lamonde, Onett</p>
    </footer>
</template>

<style scoped>

</style>