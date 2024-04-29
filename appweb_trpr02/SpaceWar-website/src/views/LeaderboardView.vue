<script setup lang="ts">
import { ref } from "vue";
import gameService from "../scripts/gameService";
import { Ranks } from "../scripts/gameService";
import Leaderboard from "../component/Leaderboard.vue";

const showPopup = ref<boolean>(false);
const listRankings = ref<Ranks[] | null>([]);

async function fetchRankings() {
  try {
    listRankings.value = await gameService.fetchRankings();
    listRankings.value?.sort((a, b) => b.score - a.score);
    } catch (error) {
    showPopup.value = true;
  }
}

fetchRankings();
</script>

<template>
  <div class="container">
    <Leaderboard :listRankings="listRankings" />
    <div v-if="showPopup" class="modal-mask">
      <dialog open class="alert alert-danger mt-3" role="alert">
        Une erreur est survenue lors du chargement du tableau de pointage.
      </dialog>
    </div>
  </div>
</template>

