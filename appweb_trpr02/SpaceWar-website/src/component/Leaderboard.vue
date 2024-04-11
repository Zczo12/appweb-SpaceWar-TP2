<script setup lang="ts">
import { ref } from 'vue'
import gameService from "../scripts/gameService"

interface Ranks {
    id: number;
    name: string;
    score: number;
}
  

const emits = defineEmits(['update']);
const showPopup = ref<boolean>(false);
const listRankings = ref<Ranks[] | null>([])

async function fetchRankings() {
  try {
    listRankings.value = await gameService.fetchRankings();
  } catch (error) {
    showPopup.value = true;
  }
}

let rankings = defineProps<{
    ranks: any[] | null; //TODO: typer Rank[]
    playerRank: any[] | null; //TODO: typer Rank
    hasWon: boolean | null;
}>();

if(rankings.hasWon){
    if(rankings.ranks && rankings.playerRank){
        rankings.ranks.push(rankings.playerRank);
    }
}

let dbError = false;

if(!rankings.ranks){
  dbError = true;
}


fetchRankings();
console.log(listRankings);
</script>

<template>
    <div class="row" v-if="!dbError">
            <div class="col">
                <h2>Nos meilleurs pilotes</h2>
                <ul id="songsList">
                <li v-for="rank in rankings.ranks" :key="rank.id">
                    rank.name + rank.score
                </li>
                </ul>
            </div>
        </div>
    <div v-if="showPopup" class="modal-mask">
        <dialog open class="alert alert-danger mt-3" role="alert">
            Une erreur est survenue lors du chargement du tableau de pointage.
        </dialog>
    </div>
</template>