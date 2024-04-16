---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Hubert"
  text: "Revue du code de Jean-Thomas"
  actions:
  - theme: alt
    text: Semaine 1
---
## **gameService.ts**
Les méthode fetch ne respectent pas le *DRY*, il serait possible d'unifier celles-ci (facilement les trois première) en une seule qui recevrait une string en paramètre.

```ts
const baseURL: string = "http://127.0.0.1:3000/";

static async fetchShips() {
  const response = await fetch(baseURL + "ships");
  return response.json();
}
```

## **NavigationBar.vue**
La navigation vers BattleScene est manquante.

## **Leaderboard.vue**
La répétition de l'interface *Ranks* ne respecte pas le *DRY*.

## **Tests**
Aucun test n'a été effectué pour le moment.


