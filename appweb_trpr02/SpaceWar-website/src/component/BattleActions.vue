<script setup lang="ts">
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

const emits = defineEmits(['battle', 'endMission']);

function notifyAttack(playerDamage: number, enemyDamage: number): void {
    emits('battle', playerDamage, enemyDamage);
}

function notifyMission(missionCounter: number, heal: boolean): void {
    emits('endMission', missionCounter, heal)
}

function attack(): void {
    let playerDamage = 0, playerOdds = 0, enemyDamage = 0, enemyAccuracy = 0, enemyOdds = 0;

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
        }
    }
        
    notifyAttack(playerDamage, enemyDamage);
}

function endMission(): void {
    if (props.player == undefined || props.enemy == undefined) {
        return;
    }else{
        if ((props.player?.vitality >= 0 || props.enemy?.ship.vitality >= 0) && props.player.vitality >= 0 && props.enemy.ship.vitality <= 0) {
            notifyMission(MISSIONCOUNTERUP, false);
        }
    }
}

function healAndEndMission(): void {
    if (props.player == undefined || props.enemy == undefined) {
        return;
    }else{
        if ((props.player?.vitality >= 0 || props.enemy?.ship.vitality >= 0) && props.player.vitality >= 0 && props.enemy.ship.vitality <= 0) {
            notifyMission(MISSIONCOUNTERUP, true);
        }
    }
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
</template>