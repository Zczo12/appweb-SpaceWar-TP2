<script setup lang="ts">
import { ref } from "vue";
import type { Ships } from "../scripts/gameService";

const currentPlayerName = ref<string | null>(null);
const currentShip = ref<Ships | null>(null);

const props = defineProps<{
  listShips: Ships[] | null;
}>()
const emit = defineEmits<{
  (
    event: "update",
    newSelectedPlayerName: string | null,
    newSelectedShipName: Ships | null
  ): void;
}>();

function handlePlayerNameAndShipNameSubmit() {
  event?.preventDefault();
  emit("update", currentPlayerName.value, currentShip.value);
}

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
        <option v-for="ship in props.listShips" :key="ship.id" :value="ship">
          {{ ship.name }}
        </option>
      </select>
      <button type="submit" class="btn btn-primary mt-3">Lancer mission</button>
    </form>
  </div>
</template>
