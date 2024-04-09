<script setup lang="ts">
const emits = defineEmits(['update']);

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
</script>

<template>
    <div class="row" v-if="!dbError">
            <div class="col">
                <h2>Nos meilleurs pilotes</h2>
                <ul id="songsList">
                <li v-for="rank in rankings.ranks" :key="rank.id">
                    <!--rank.name + rank.score-->
                </li>
                </ul>
            </div>
        </div>
        <div v-else>
        <div class="alert alert-danger bg-dark text-white" role="alert">
            Une erreur est survenue lors du chargement du tableau de pointage.
        </div>
    </div>
</template>