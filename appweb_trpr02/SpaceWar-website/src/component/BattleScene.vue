<script setup lang="ts">
import { ref } from "vue";
import gameService, { Player, Characters } from "../scripts/gameService";
import BattleActions from './BattleActions.vue';
import BattleMission from './BattleMission.vue';
import BattlePlayer from './BattlePlayer.vue';
import BattleEnemy from './BattleEnemy.vue'
import { useRoute } from "vue-router";

const route = useRoute();
const showPopup = ref<boolean>(false);
const listCharacters = ref<Characters[] | null>([]);

const playerName = ref<string | string[]>("");
const player = ref<Player | null>();
const shipName = ref<string | string[]>("");

const currentEnemy = ref<Characters | null>();

const missionCounter = ref<number | null>(0);

function setPlayerInfos(){
    playerName.value = route.params.player_name;  
    shipName.value = route.params.ship_name;
    player.value = { 
        name: Array.isArray(playerName.value) ? playerName.value[0] : playerName.value, 
        credit: 0, 
        vitality: 0 /*vitality de ship (a revoir)*/ 
    };
}

async function fetchCharacters() {
  try {
    listCharacters.value = await gameService.fetchCharacters();
  } catch (error) {
    showPopup.value = true;
  }
  getRandomEnemy();
}

function getRandomEnemy(){
    if (listCharacters.value) { 
        let randomIndex: number = Math.floor(Math.random() * listCharacters.value.length); 
        currentEnemy.value = listCharacters.value[randomIndex];
    } 
}

setPlayerInfos();
fetchCharacters();
</script>

<template>
    <div class="container text-white mt-3">
        <div class="row mb-2" >
            <BattleActions :player="player" :enemy="currentEnemy" :missionCounter="missionCounter" />
            <BattleMission :missionCounter="missionCounter"/>
        </div>
        <div class="row">
            <BattlePlayer :playerName="playerName" :shipName="shipName" />
            <BattleEnemy :enemy="currentEnemy" />
        </div>
    </div>
    <div v-if="showPopup" class="modal-mask">
        <dialog open class="alert alert-danger mt-3" role="alert">
            Une erreur est survenue lors du chargement des ennemis.
        </dialog>
    </div>
</template>