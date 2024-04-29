---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "JT"
  text: "revue du code de Hub"
  tagline: Semaine 1

---
## **Coding 1** : 
*Dry* sur le pop-up pour la gestion d'erreur avec les vues pour la BattleScene (5 fois dans les 5 vues qui concernce Battle)

```ts
    <div v-if="showPopup" class="modal-mask">
        <dialog open class="alert alert-danger mt-3" role="alert">
            Une erreur est survenue lors du chargement des ennemis.
        </dialog>
    </div>
```

## **Coding 2** : Usage de const pour des valeurs prédéfinies
  Les valeurs telles (20, 35, 50, 70) : 

```ts
    switch(props.enemy?.experience) {
        case 1: enemyAccuracy = 20; break;
        case 2: enemyAccuracy = 35; break;
        case 3: enemyAccuracy = 50; break;
        case 4: enemyAccuracy = 70; break;
    }
```
et (101)
```ts
    playerOdds = Math.floor(Math.random() * 101);
    enemyOdds = Math.floor(Math.random() * 101);
```
devraient être des const (BattleActions.vue)


## **Others** : BattleAction ne recoit pas de props
Il manque des props pour le fontionnement de BattleAction.vue




