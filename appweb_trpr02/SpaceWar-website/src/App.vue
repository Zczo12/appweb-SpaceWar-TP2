<script setup lang="ts">
import { ref } from 'vue'
//import { RouterLink, RouterView } from 'vue-router'
//import Acceuil from './component/Acceuil.vue';
const playerName = ref<string | null>('');
const shipName = ref<string | null>('');

</script>

<template>
    <header class="container-fluid bg-dark text-light p-4 text-center">
      <h1>Bee Swarm Showdown</h1>
    </header>
    <main>
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