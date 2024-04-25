<script setup lang="ts">
import { ref } from "vue";
import gameService, { Player, Characters } from "../scripts/gameService";
import BattleActions from "./BattleActions.vue";
import BattleMission from "./BattleMission.vue";
import BattlePlayer from "./BattlePlayer.vue";
import BattleEnemy from "./BattleEnemy.vue";
import router from "../router";
import { useRoute } from "vue-router";

const route = useRoute();
const showPopup = ref<boolean>(false);
const showWinPopup = ref<boolean>(false);
const showLosePopup = ref<boolean>(false);

const listCharacters = ref<Characters[] | null>([]);

const playerName = ref<string | string[]>("");
const player = ref<Player | null>();
const shipName = ref<string | string[]>("");

const currentEnemy = ref<Characters | null>();

const missionCounter = ref<number | null>(0);

function setPlayerInfos() {
  playerName.value = route.params.player_name;
  shipName.value = route.params.ship_name;
  player.value = {
    name: Array.isArray(playerName.value)
      ? playerName.value[0]
      : playerName.value,
    credit: 0,
    vitality: 100,
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

function getRandomEnemy() {
  if (listCharacters.value) {
    let randomIndex: number = Math.floor(
      Math.random() * listCharacters.value.length
    );
    currentEnemy.value = listCharacters.value[randomIndex];
  }
}

setPlayerInfos();
fetchCharacters();

async function handleNextMission(missionCounter: number, heal: boolean) {
  if (missionCounter == 5) {
    //Faire un pop up avec un bouton qui redirige au leaderboard (va voir dans le fichier Accueil pour voir le router.push pis oublie pas de add
    // la value a la bd)
  } else {
    missionCounter += missionCounter;
    if (heal === true && player.value) {
        const creditsNeeded = Math.max(0, (100 - player.value.vitality) * 2); 
        const creditsUsed = Math.min(player.value.credit, creditsNeeded); 
        const vitalityGained = Math.floor(creditsUsed / 2); 
        player.value.vitality += vitalityGained; 
        player.value.credit -= creditsUsed; 
    }
    getRandomEnemy();
  }
}

async function notifyAttack(
  playerDamage: number,
  enemyDamage: number,
  playerCredits: number | undefined
) {
  if (player.value?.vitality != 0 && currentEnemy.value?.ship.vitality != 0) {
    if (player.value && player.value.vitality !== undefined) {
      player.value.vitality -= enemyDamage;
      showLosePopup.value = false;
      if (player.value.vitality < 0) {
        player.value.vitality = 0;
        showLosePopup.value = true;
      }
    }

    if (player.value && playerCredits !== undefined) {
      player.value.credit += playerCredits;
    }

    if (
      currentEnemy.value &&
      currentEnemy.value.ship &&
      currentEnemy.value.ship.vitality !== undefined
    ) {
      currentEnemy.value.ship.vitality -= playerDamage;
      showWinPopup.value = false;
      if (currentEnemy.value.ship.vitality < 0) {
        currentEnemy.value.ship.vitality = 0;
        showWinPopup.value = true;
      }
    }
  }
}

function goToMainMenu() {
    router.push({ name: 'Accueil' });
  }

</script>

<template>
  <div class="container text-white mt-3">
    <div class="row mb-2">
      <BattleActions
        :player="player"
        :enemy="currentEnemy"
        :missionCounter="missionCounter"
        @battle="notifyAttack"
        @endMission="handleNextMission"
      />
      <BattleMission :missionCounter="missionCounter" />
    </div>
    <div class="row">
      <BattlePlayer :player="player" :shipName="shipName" />
      <BattleEnemy :enemy="currentEnemy" />
    </div>
  </div>
  <div v-if="showPopup" class="modal-mask">
    <dialog open class="alert alert-danger mt-3" role="alert">
      Une erreur est survenue lors du chargement des ennemis.
    </dialog>
  </div>

  <div v-if="showWinPopup" class="modal-mask">
    <dialog open class="alert alert-primary mt-3" role="alert">Vous avez gagné... veuillez clickez sur terminer la mission pour continuer </dialog>
  </div>

  <div v-if="showLosePopup" class="modal-mask">
  <dialog open class="alert alert-danger mt-3" role="alert">
    Vous avez perdu... si vous voulez faire un autre partie retourner au menu
    <button @click="goToMainMenu" class="btn btn-primary mt-3">Retourner au menu</button>
  </dialog>
</div>

</template>
