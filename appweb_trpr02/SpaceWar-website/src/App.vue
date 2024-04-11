<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import NavigationBar from '../src/component/NavigationBar.vue'
//import Acceuil from './component/Acceuil.vue';
const playerName = ref<string | null>('');
const shipName = ref<string | null>('');


</script>

<template>
  <header>
    <NavigationBar />
  </header>
    
    <main>
      <RouterView />
      <div>
        <form>
            <p>Nom du joueur: <input type="text" required v-model="playerName"</p>
            <p>Nom du vaisseau: <input type="text" required v-model="shipName"</p>
            <button type="submit">Lancer mission</button>
        </form>
    </div>
    </main>
    <footer class="container-fluid bg-secondary text-light p-1">
      <p class="text-center">Copyright Hubert Beaupré, Jean-Thomas Lamonde, Onett</p>
    </footer>
</template>

<style scoped>

</style>