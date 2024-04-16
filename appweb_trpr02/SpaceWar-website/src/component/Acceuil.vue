<script setup lang="ts">
const emits = defineEmits(['update']);

function notifyParent(newPlayerName: string, newShipName: string): void{
  emits('update', newPlayerName, newShipName);
  //TODO navigation
}

let currentPlayerName: string = '';
let currentShipName: string = '';

function setPlayerInfos(newPlayerName: string, newShipName: string){
    currentPlayerName = newPlayerName;
    currentShipName = newShipName;
    notifyParent(newPlayerName, newShipName);
}

const handleSubmit = (event: Event) => {
    //TODO verifications
    setPlayerInfos(currentPlayerName, currentShipName);
}
</script>

<template>
    <div>
        <form @submit="handleSubmit">
            <p>Nom du joueur: <input type="text" required v-model="currentPlayerName"</p>
            <p>Nom du vaisseau: <input type="text" required v-model="currentShipName"</p>
            <button type="submit">Lancer mission</button>
        </form>        
    </div>

</template>