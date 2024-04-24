<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
    missionCounter: number | null;
}>();

const showPopup = ref<boolean>(false);

</script>

<template>

    <div class="col-6">
        <div class="box rounded m-1" style="height: 200px; background-color: #3b3b3b; overflow: hidden;">
            <div class="header bg-primary rounded-top p-3">Mission en cours</div>
            <div class="p-4">
                <h5>{{ props.missionCounter }}/5</h5>
                <p style="word-wrap: break-word;">Objectif: survivre à 5 missions en obtenant le plus de crédits</p>                        
            </div>
        </div>
    </div>

    <div v-if="showPopup" class="modal-mask">
        <dialog open class="alert alert-danger mt-3" role="alert">
            Une erreur est survenue lors du chargement du tableau de pointage.
        </dialog>
    </div>
</template>