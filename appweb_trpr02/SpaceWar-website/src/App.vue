<script setup lang="ts">
//import { ref } from 'vue'
import { RouterView } from 'vue-router'
import NavigationBar from '../src/component/NavigationBar.vue'

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
// playerName = ref<string | null>('');
// const shipName = ref<string | null>('');

/*
function handleUpdate(newPlayerName: string, newShipName: string){
  playerName.value = newPlayerName;
  shipName.value = newShipName;
}
*/

</script>

<template>
  <header>
    <NavigationBar />
  </header>
    
    <main>
      <RouterView />
    </main>
    <footer class="container-fluid bg-secondary text-light p-1">
      <p class="text-center">Copyright Hubert Beaupré, Jean-Thomas Lamonde, Onett</p>
    </footer>
</template>

<style scoped>

</style>