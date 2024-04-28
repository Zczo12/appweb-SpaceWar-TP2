<script setup lang="ts">
import { ref } from "vue";
import { Ships } from "../scripts/gameService";
import router from "../router";
import gameService from "../scripts/gameService";
import AccueilForm from "../component/AccueilForm.vue";

const currentPlayerName = ref<string | null>(null);
const currentShip = ref<Ships | null>(null);
const listShips = ref<Ships[] | null>(null);
const showPopup = ref(false);



async function fetchShips() {
  try {
    listShips.value = await gameService.fetchShips();
    listShips.value?.sort();
  } catch (error) {
    showPopup.value = true;
  }
}


function handleFormSubmit(newPlayerName: string | null , newShip: Ships | null) {
  setPlayerInfos(newPlayerName, newShip);
  if (currentPlayerName.value && currentShip.value) {
    router.push({
      name: "BattleScene",
      params: 
        {
            player_name: currentPlayerName.value,
            ship_name: currentShip.value.name
        }
    });
  }

}

function setPlayerInfos(newPlayerName: string | null , newShip: Ships | null) {
  currentPlayerName.value = newPlayerName;
  currentShip.value = newShip;
}
 
fetchShips();
</script>

<template>
<AccueilForm :listShips="listShips" @update="handleFormSubmit" />
  <div v-if="showPopup" class="modal-mask">
      <div class="alert alert-danger mt-3" role="alert">
        Une erreur est survenue lors du chargement des vaisseaux.
      </div>
    </div>
</template>
