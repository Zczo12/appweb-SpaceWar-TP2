<script setup lang="ts">
import { ref } from 'vue'
//import { RouterLink, RouterView } from 'vue-router'
import Acceuil from './component/Acceuil.vue';

/*
const characters = ref<Characters[]>([]);
const ships = ref<Ship[]>([]);
const rankings = ref<Rank[]>([]);

async function getCharacters() {
  characters.value = await enemyService.getCharacters();
}
async function getShips() {
  ships.value = await enemyService.getShips();
}
async function getRankings() {
  characters.value = await enemyService.getRankings();
}
*/
const playerName = ref<string | null>('');
const shipName = ref<string | null>('');

function handleUpdate(newPlayerName: string, newShipName: string){
  playerName.value = newPlayerName;
  shipName.value = newShipName;
}

</script>

<template>
    <header class="container-fluid bg-dark text-light p-4 text-center">
      <h1>Bee Swarm Showdown</h1>
    </header>
    <main>
      <Acceuil />
    </main>
    <footer class="container-fluid bg-secondary text-light p-1">
      <p class="text-center">Copyright Hubert Beaupré, Jean-Thomas Lamonde, Onett</p>
    </footer>
</template>