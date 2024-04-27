<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';
import { Player, Characters } from "../scripts/gameService";

const MISSIONCOUNTERUP : number = 1;

const DÉBUTANT_ACCURACY : number = 20 ;
const CONFIRMÉ_ACCURACY : number = 35 ;
const EXPERT_ACCURACY : number = 50 ;
const MAITRE_ACCURACY : number = 70 ;

const props = defineProps<{
    player: Player | null | undefined;
    enemy: Characters | null | undefined;
}>();

const showPopup = ref<boolean>(false);

const emits = defineEmits(['battle', 'endMission']);

function notifyAttack(playerDamage: number, enemyDamage: number, playerCredits: number | undefined): void {
    emits('battle', playerDamage, enemyDamage, playerCredits);
}

function notifyMission(missionCounter: number, heal: boolean): void {
    emits('endMission', missionCounter, heal)
}

function attack(): void {
    let playerDamage = 0, playerOdds = 0, enemyDamage = 0, enemyAccuracy = 0, enemyOdds = 0, gainedCredits: number | undefined = 0;

    switch(props.enemy?.experience) {
        case 1: enemyAccuracy = DÉBUTANT_ACCURACY; break;
        case 2: enemyAccuracy = CONFIRMÉ_ACCURACY; break;
        case 3: enemyAccuracy = EXPERT_ACCURACY; break;
        case 4: enemyAccuracy = MAITRE_ACCURACY; break;
    }

    playerOdds = Math.floor(Math.random() * 101);
    enemyOdds = Math.floor(Math.random() * 101);

    if(playerOdds <= 70)
        playerDamage = (Math.floor(Math.random() * 15) + 5);

    if(enemyOdds <= enemyAccuracy) {
        enemyDamage = (Math.floor(Math.random() * 10) + 3);
        if(enemyDamage >= (props.enemy?.ship?.vitality || 0)){
            gainedCredits = props.enemy?.credit;
        }
    }
        
    notifyAttack(playerDamage, enemyDamage, gainedCredits);
}

function endMission(): void {
    notifyMission(MISSIONCOUNTERUP, false);
}

function healAndEndMission(): void {
    notifyMission(MISSIONCOUNTERUP, true);
}

if (props.player == null || props.enemy == null) {
    showPopup.value = true;
} else {
    showPopup.value = false;
}
</script>

<template>

    <div class="col-6">
        <div class="box rounded m-1" style="height: 200px; background-color: #3b3b3b;">
            <div class="header bg-primary rounded-top p-3">Actions</div>
            <div class="p-4">
                <button @click="attack()" type="button" class="btn btn-primary">Combattre</button>
                <button @click="endMission()" type="button" class="btn btn-primary">Terminer la mission</button>
                <button @click="healAndEndMission()" type="button" class="btn btn-primary">Terminer la mission et réparer le vaisseau</button>                        
            </div>
        </div>
    </div>

    <div v-if="showPopup" class="modal-mask">
        <dialog open class="alert alert-danger mt-3" role="alert">
            Une erreur est survenue lors du chargement des participants du duel.
        </dialog>
    </div>
</template>