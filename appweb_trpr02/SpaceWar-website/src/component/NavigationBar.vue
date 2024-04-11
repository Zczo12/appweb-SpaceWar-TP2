<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light ">
    <div class="container-fluid">
      <img src="../assets/Death-Star-icon_34500.png" alt="Un petit vaiseau spatial" width=" 75px">
      <div class="collapse navbar-collapse" id="navbarSupportedContent"> 
        <h1 class="container-fluid text-dark p-4 text-center">Epic Space War Simulator</h1> 
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <RouterLink class="nav-link" id="accueil" to="/">Acceuil</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" id="leaderboard" to="/leaderboard">Leaderboard</RouterLink>
          </li>
        </ul>

      </div>
    </div>
  </nav>
</template>
