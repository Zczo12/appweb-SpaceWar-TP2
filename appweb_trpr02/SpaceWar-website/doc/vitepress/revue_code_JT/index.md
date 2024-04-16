---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "JT"
  text: "revue du code de Hub"
  tagline: Semaine 1

---
## **Coding 1** : Mauvais type d'input pour les ships
  Actuellement, Le nom et le ship sont des inputs de type texte dans Accueil.vue.    Utiliser un fetch avec un select/v-model serait plus approprié pour les ships.

## **Coding 2** : Const ref vs Let
  Utiliser des valeurs let est correct, mais l'usage des valeurs const ref<> est préférable avec vue. Cela nous permet de changer la valeur sans pourvoir réassigner la variable.

  ```typescript

      const showPopup = ref<boolean>(false);
      instead of 
      let showPopup | boolean;

  ```

  ## **Testing 1** : Tests manquants
  Les vues Leadboard.vue et Accueil.vue ne sont pas testés. Tu devrais ajouter quelques tests pour vous assurer qu'ils fonctionnent comme prévu.

  ## **Others** : Mauvaise logique Accueil.vue
  Accueil.vue utiise un logique Parent/Enfant avec les props et les emits. La logique pour le passage de données devrait être fait avec le routing et la barre de recherche.




