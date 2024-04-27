<script setup lang="ts">
import { ref } from "vue";
import gameService, { Player, Characters, Ranks } from "../scripts/gameService";
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
const showSuccessPopup = ref<boolean>(false);
const showWinButDeadPopUp = ref<boolean>(false);

const listCharacters = ref<Characters[] | null>([]);

const playerName = ref<string | string[]>("");
const player = ref<Player | null>();
const shipName = ref<string | string[]>("");

const currentEnemy = ref<Characters | null>();

const currentMissionCount = ref<number>(1);

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
    showWinPopup.value = false;
    let randomIndex: number = Math.floor(
      Math.random() * listCharacters.value.length
    );
    currentEnemy.value = listCharacters.value[randomIndex];
  }
}

setPlayerInfos();
fetchCharacters();

async function handleNextMission(missionCounter: number, heal: boolean) {
  if (currentMissionCount.value >= 5) {
    showSuccessPopup.value = true;
  } else {
    if (
      currentMissionCount.value !== null &&
      currentEnemy.value &&
      currentEnemy.value.ship.vitality <= 0
    ) {
      currentMissionCount.value += missionCounter;
    }

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

async function notifyAttack(playerDamage: number, enemyDamage: number) {
  if (player.value?.vitality != 0 && currentEnemy.value?.ship.vitality != 0) {
    if (player.value && player.value.vitality !== undefined) {
      player.value.vitality -= enemyDamage;
      showLosePopup.value = false;
      if (player.value.vitality < 0) {
        player.value.vitality = 0;
        showLosePopup.value = true;
      }
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
        if (player.value) player.value.credit += currentEnemy.value.credit;
        showWinPopup.value = true;
      }
    }
    if (
      player.value &&
      player.value.vitality !== undefined &&
      currentEnemy.value &&
      currentEnemy.value.ship.vitality !== undefined
    ) {
      if (currentEnemy.value.ship.vitality < 0 && player.value.vitality < 0) {
      }
    }
  }
}

function goToMainMenu() {
  router.push({ name: "Accueil" });
}

function goToLeaderBoard() {
  if (player.value) {
    const newRanking: Ranks = {
      id: 4,
      name: playerName.value[0],
      score: player.value?.credit,
    };

    gameService
      .addRanking(newRanking)
      .then((data) => {
        console.log("New ranking added successfully:", data);
      })
      .catch((error) => {
        console.error("Error adding new ranking:", error);
      });

    router.push({ name: "Leaderboard" });
  }
}
</script>

<template>
  <div class="container text-white mt-3">
    <div class="row mb-2">
      <BattleActions
        :player="player"
        :enemy="currentEnemy"
        :missionCounter="currentMissionCount"
        @battle="notifyAttack"
        @endMission="handleNextMission"
      />
      <BattleMission :missionCounter="currentMissionCount" />
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
    <dialog open class="alert alert-primary mt-3" role="alert">
      Vous avez gagné {{ currentEnemy?.credit }} CG... veuillez clickez sur
      terminer la mission pour continuer
    </dialog>
  </div>

  <div v-if="showWinButDeadPopUp" class="modal-mask">
    <dialog open class="alert alert-primary mt-3" role="alert">
      Vous avez gagné {{ currentEnemy?.credit }} CG, mais vous avez perdu votre vaisseau. Réparer votre vaiseau pour continuer l'aventure
    </dialog>
  </div>

  <div v-if="showLosePopup" class="modal-mask">
    <dialog open class="alert alert-danger mt-3" role="alert">
      Vous avez perdu... si vous voulez faire un autre partie retourner au menu
      <button @click="goToMainMenu" class="btn btn-primary mt-3">
        Retourner au menu
      </button>
    </dialog>
  </div>

  <div v-if="showSuccessPopup" class="modal-mask">
    <dialog open class="alert alert-primary mt-3" role="alert">
      Vous avez complété toute les missions! Vous pouvez aller voir votre
      classement
      <button @click="goToLeaderBoard" class="btn btn-primary mt-3">
        Votre classement
      </button>
    </dialog>
  </div>
</template>
