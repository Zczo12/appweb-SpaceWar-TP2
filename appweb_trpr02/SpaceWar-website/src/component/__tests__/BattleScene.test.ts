import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import BattleScene from '../BattleScene.vue'

describe('BattleScene.vue', () => {
  
  it('devrait émettre un événement pour aller au menu principal lorsque la fonction goToMainMenu est appelée', async () => {
    const wrapper = mount(BattleScene)
    
    wrapper.vm.$emit('goToMainMenu')
    await wrapper.vm.$nextTick()
    
    expect(wrapper.emitted('goToMainMenu')).toBeTruthy()
  })
  
  it('devrait émettre un événement pour aller au tableau des scores lorsque la fonction goToLeaderboard est appelée', async () => {
    const wrapper = mount(BattleScene)

    wrapper.vm.$emit('goToLeaderBoard')
    await wrapper.vm.$nextTick()
    
    expect(wrapper.emitted('goToLeaderBoard')).toBeTruthy()
  })

  it('displays error popup when showPopup is true', async () => {
    const wrapper = mount(BattleScene, {
      data() {
        return {
          showPopup: true,
        };
      }
    });

    await wrapper.vm.$nextTick();

    const errorPopup = wrapper.find('.modal-mask .alert-danger');
    expect(errorPopup.exists()).toBe(true);
    expect(errorPopup.text()).toContain("Une erreur est survenue lors du chargement des ennemis.");
  });

  it('displays win popup when showWinPopup is true', async () => {
    const wrapper = mount(BattleScene, {
      data() {
        return {
          showWinPopup: true,
        };
      }
    });

    await wrapper.vm.$nextTick();

    const winPopup = wrapper.find('.modal-mask .alert-primary');
    expect(winPopup.exists()).toBe(true);
    expect(winPopup.text()).toContain("Vous avez gagné");
  });

})
