<script setup lang="ts">
import { ref } from "vue";
import { Ranks } from "../scripts/gameService";

const showPopup = ref<boolean>(false);

const props = defineProps<{
  listRankings: Ranks[] | null;
}>()

</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <h2 class="text-center">Nos meilleurs pilotes</h2>
        <ul id="leaderboard" class="list-group">
          <li v-for="rank in props.listRankings" :key="rank.id" class="list-group-item">
            <div class="row">
              <div class="col-sm-6">{{ rank.name }}</div>
              <div class="col-sm-6 text-end">  {{ rank.score }} credits</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div v-if="showPopup" class="modal-mask">
      <dialog open class="alert alert-danger mt-3" role="alert">
        Une erreur est survenue lors du chargement du tableau de pointage.
      </dialog>
    </div>
  </div>
</template>

