<script setup lang="ts">
import { ref } from "vue";
import { Ships } from "../scripts/gameService";
import router from "../router";
import AccueilForm from "./AccueilForm.vue";

const currentPlayerName = ref<string | null>(null);
const currentShip = ref<Ships | null>(null);

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
 
</script>

<template>
  <AccueilForm @update="handleFormSubmit"/>
</template>
