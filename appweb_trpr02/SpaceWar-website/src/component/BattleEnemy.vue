<script setup lang="ts">
import { ref, computed } from "vue";

const showPopup = ref<boolean>(false);

const enemyHealth = ref<number | null>(100);
const enemyCredits = ref<number | null>(0);

const progressBarWidth = computed(() => {
  return `${enemyHealth.value}%`;
});
</script>

<template>
    <div class="col-6">
        <div class="box rounded m-1" style="height: 200px; background-color: #3b3b3b;">
            <div class="header bg-primary text-white rounded-top p-3">Ennemi</div>
            <div class="p-4">
                <h5>Maitre - {{ enemyCredits }} CG</h5>
                <p class="text-center">Nom du vaisseau</p>
                <div class="progress">
                    <div class="progress-bar" role="progressbar" :style="{ width: progressBarWidth }" 
                        aria-valuenow="enemyHealth" aria-valuemin="0" aria-valuemax="100">
                        {{ enemyHealth }}%
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