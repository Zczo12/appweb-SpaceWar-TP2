<script setup lang="ts">
import { ref, computed } from "vue";

const props = defineProps<{
  playerName: string | string[];
  shipName: string | string[];
}>();

const showPopup = ref<boolean>(false);

const playerHealth = ref<number | null>(100);
const playerCredits = ref<number | null>(0);

const progressBarWidth = computed(() => {
  return `${playerHealth.value}%`;
});
</script>

<template>
    
    <div class="col-6">
        <div class="box rounded m-1" style="height: 200px; background-color: #3b3b3b;">
            <div class="header bg-primary rounded-top p-3">{{ props.playerName }}</div>
            <div class="p-4">
                <h5>Maitre - {{ playerCredits }} CG</h5>
                <p class="text-center">{{ props.shipName }}</p>
                <div class="progress">
                    <div class="progress-bar" role="progressbar" :style="{ width: progressBarWidth }" 
                        aria-valuenow="playerHealth" aria-valuemin="0" aria-valuemax="100">
                        {{ playerHealth }}%
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
