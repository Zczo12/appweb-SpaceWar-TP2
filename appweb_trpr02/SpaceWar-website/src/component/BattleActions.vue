<script setup lang="ts">
import { ref } from "vue";

const showPopup = ref<boolean>(false);


</script>

<template>

    <div class="col-6">
        <div class="box rounded m-1" style="height: 200px; background-color: #3b3b3b;">
            <div class="header bg-primary rounded-top p-3">Actions</div>
            <div class="p-4">
                <button type="button" class="btn btn-primary">Combattre</button>
                <button type="button" class="btn btn-primary">Terminer la mission</button>
                <button type="button" class="btn btn-primary">Terminer la mission et réparer le vaisseau</button>                        
            </div>
        </div>
    </div>

    <div v-if="showPopup" class="modal-mask">
        <dialog open class="alert alert-danger mt-3" role="alert">
            Une erreur est survenue lors du chargement du tableau de pointage.
        </dialog>
    </div>
</template>