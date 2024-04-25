<script setup lang="ts">
import { ref, computed } from "vue";
import { Player } from "../scripts/gameService";

const props = defineProps<{
  player: Player | null | undefined;
  shipName: string | string[] | null;
}>();

const showPopup = ref<boolean>(false);

const playerCredits = ref<number | null>(0);

const progressBarWidth = computed(() => {
    console.log(props.player?.vitality)
  return `${props.player?.vitality}%`;
});
</script>

<template>
    
    <div class="col-6">
        <div class="box rounded m-1" style="height: 200px; background-color: #3b3b3b;">
            <div class="header bg-primary rounded-top p-3">{{ props.player?.name }}</div>
            <div class="p-4">
                <h5>Maitre - {{ playerCredits }} CG</h5>
                <p class="text-center">{{ props.shipName }}</p>
                <div class="progress">
                    <div class="progress-bar" role="progressbar" :style="{ width: progressBarWidth }" 
                        aria-valuenow="playerHealth" aria-valuemin="0" aria-valuemax="100">
                        {{ player?.vitality }}%
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
