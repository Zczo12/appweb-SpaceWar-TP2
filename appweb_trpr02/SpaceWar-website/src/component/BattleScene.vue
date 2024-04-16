<script setup lang="ts">
import { ref } from "vue";
import gameService, { Characters } from "../scripts/gameService";
import BattleActions from './BattleActions.vue';
import BattleMission from './BattleMission.vue';
import BattlePlayer from './BattlePlayer.vue';
import BattleEnemy from './BattleEnemy.vue';

const showPopup = ref<boolean>(false);
const listCharacters = ref<Characters[] | null>([]);

const playerHealth = ref<number>(0);
const enemyHealth = ref<number>(0);
const missionCount = ref<number>(1);
//TODO : props

async function fetchCharacters() {
  try {
    listCharacters.value = await gameService.fetchCharacters();
  } catch (error) {
    showPopup.value = true;
  }
}

fetchCharacters();
</script>

<template>
    <div class="container text-white">
        <div class="row">
            <BattleActions />
            <BattleMission />
        </div>
        <div class="row">
            <BattlePlayer />
            <BattleEnemy />
        </div>
    </div>
    <div v-if="showPopup" class="modal-mask">
        <dialog open class="alert alert-danger mt-3" role="alert">
            Une erreur est survenue lors du chargement du tableau de pointage.
        </dialog>
    </div>
</template>