<script setup lang="ts">
import { ref, defineEmits } from "vue";
import gameService from "../scripts/gameService";
import type { Ships } from "../scripts/gameService";

const showPopup = ref(false);
const currentPlayerName = ref<string | null>(null);
const currentShip = ref<Ships | null>(null);
const listShips = ref<Ships[] | null>(null);

const emit = defineEmits<{
  (
    event: "update",
    newSelectedPlayerName: string | null,
    newSelectedShipName: Ships | null
  ): void;
}>();
async function fetchShips() {
  try {
    listShips.value = await gameService.fetchShips();
    listShips.value?.sort();
  } catch (error) {
    showPopup.value = true;
  }
}

function handlePlayerNameAndShipNameSubmit() {
  event?.preventDefault();
  emit("update", currentPlayerName.value, currentShip.value);
}

fetchShips();
</script>

<template>
  <div style="width: 500px" class="container text-center">
    <form @submit="handlePlayerNameAndShipNameSubmit" class="mt-5">
      <div class="">
        Nom du joueur:
        <input
          class="form-control"
          type="text"
          required
          v-model="currentPlayerName"
        />
      </div>
      <div class="mt-3">Nom du vaisseau:</div>
      <select v-model="currentShip" class="form-select form-control">
        <option disabled value="">Please select one</option>
        <option v-for="ship in listShips" :key="ship.id" :value="ship">
          {{ ship.name }}
        </option>
      </select>
      <button type="submit" class="btn btn-primary mt-3">Lancer mission</button>
    </form>
    <div v-if="showPopup" class="modal-mask">
      <div class="alert alert-danger mt-3" role="alert">
        Une erreur est survenue lors du chargement des vaisseaux.
      </div>
    </div>
  </div>
</template>
