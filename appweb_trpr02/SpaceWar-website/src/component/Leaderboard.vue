<script setup lang="ts">
import { ref } from "vue";
import gameService from "../scripts/gameService";
import { Ranks } from "../scripts/gameService";


const showPopup = ref<boolean>(false);
const listRankings = ref<Ranks[] | null>([]);

async function fetchRankings() {
  try {
    listRankings.value = await gameService.fetchRankings();
  } catch (error) {
    showPopup.value = true;
  }
}

fetchRankings();
</script>

<template>
  <div class="row">
    <div class="col">
      <h2>Nos meilleurs pilotes</h2>
      <ul id="leaderboard">
        <li v-for="rank in listRankings" :key="rank.id">
          {{ rank.name }}  :  {{ rank.score }} points
        </li>
      </ul>
    </div>
  </div>
  <div v-if="showPopup" class="modal-mask">
    <dialog open class="alert alert-danger mt-3" role="alert">
      Une erreur est survenue lors du chargement du tableau de pointage.
    </dialog>
  </div>
</template>
