<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { Characters } from "../scripts/gameService";

const props = defineProps<{
    enemy: Characters | null | undefined;
}>();

const initialVitality = ref<number>();

initialVitality.value = props.enemy?.ship.vitality;

watch(() => props.enemy, (newEnemy) => {
    if (newEnemy && newEnemy.ship.vitality !== undefined) {
        initialVitality.value = newEnemy.ship.vitality;
    }
});

function getExperience(experience: number | undefined): string {
    switch (experience) {
        case 1:
            return "Débutant";
        case 2:
            return "Confirmé";
        case 3:
            return "Expert";
        case 4:
            return "Maitre";
        default:
            return "Inconnu";
    }
}


const showPopup = ref<boolean>(false);


const progressBarWidth = computed(() => {
  return `${props.enemy?.ship.vitality}%`;
});
</script>

<template>
    <div class="col-6">
        <div class="box rounded m-1" style="height: 200px; background-color: #3b3b3b;">
            <div class="header bg-primary text-white rounded-top p-3">{{ props.enemy?.name }}</div>
            <div class="p-4">
                <h5>{{ getExperience(props.enemy?.experience) }} - {{ props.enemy?.credit }} CG</h5>
                <p class="text-center">{{ props.enemy?.ship.name }}</p>
                <div class="progress">
                    <div class="progress-bar" role="progressbar" :style="{ width: progressBarWidth }" 
                        aria-valuenow="props.enemy.ship.vitality" aria-valuemin="0" aria-valuemax=initialVitality.value.>
                        {{ props.enemy?.ship.vitality }}%
                    </div>
                </div>                       
            </div>
        </div>
    </div>

    <div v-if="showPopup" class="modal-mask">
        <dialog open class="alert alert-danger mt-3" role="alert">
            Une erreur est survenue lors du chargement du tableau de pointage.
        </dialog>
    </div>
</template>