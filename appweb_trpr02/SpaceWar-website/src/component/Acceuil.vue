<script setup lang="ts">
import { ref } from "vue";
import { Ships } from "../scripts/gameService";
import router from "../router";
import gameService from "../scripts/gameService";

const showPopup = ref<boolean>(false);
const currentPlayerName = ref<string | null>(null);
const currentShip = ref<Ships | null>(null);
const listShips = ref<Ships[] | null>(null);

function setPlayerInfos(newPlayerName: string | null , newShip: Ships | null) {
  currentPlayerName.value = newPlayerName;
  currentShip.value = newShip;
}

const handleSubmit = (event: Event) => {
  event.preventDefault();
  setPlayerInfos(currentPlayerName.value, currentShip.value);
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
};  


async function fetchShips() {
  try {
    listShips.value = await gameService.fetchShips();
    listShips.value?.sort();
  } catch (error) {
    showPopup.value = true;
  }
}

fetchShips();
</script>

<template>
 <div class="container text-center">
        <form @submit="handleSubmit" class="mt-5">
            <div class="">
                Nom du joueur: 
                <input class="form-control" type="text" required v-model="currentPlayerName">
            </div>
            <div class="mt-3">Nom du vaisseau:</div>
            <select v-model="currentShip" class="form-select form-control">
                <option disabled value="">Please select one</option>
                <option v-for="ship in listShips" :key="ship.id" :value="ship">{{ ship.name }}</option>
            </select>
            <button type="submit" class="btn btn-primary mt-3 mb-3">Lancer mission</button>
        </form>
        <div v-if="showPopup" class="modal-mask">
            <div class="alert alert-danger mt-3" role="alert">
                Une erreur est survenue lors du chargement du tableau de pointage.
            </div>
        </div>
    </div>
</template>
