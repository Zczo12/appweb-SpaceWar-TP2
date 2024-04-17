<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  playerName: string | string[];
  shipName: string | string[];
}>();

const showPopup = ref<boolean>(false);

</script>

<template>

    <div class="col-6">
        <div class="box rounded m-1" style="height: 200px; background-color: #3b3b3b;">
            <div class="header bg-primary rounded-top p-3">{{ props.playerName }}</div>
            <div class="p-4">
                <h5>Maitre - 0 CG</h5>
                <p class="text-center">{{ props.shipName }}</p>
                <progress class="w-100" value="100" max ="100">100%</progress>                       
            </div>
        </div>
    </div>

    <div v-if="showPopup" class="modal-mask">
        <dialog open class="alert alert-danger mt-3" role="alert">
            Une erreur est survenue lors du chargement du tableau de pointage.
        </dialog>
    </div>
</template>