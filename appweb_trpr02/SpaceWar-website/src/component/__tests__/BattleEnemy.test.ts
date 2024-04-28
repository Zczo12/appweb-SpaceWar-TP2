import { mount } from "@vue/test-utils";
import BattleEnemy from "../BattleEnemy.vue";
import { describe, expect, it } from "vitest";

describe('BattleEnemy', () => {
  it('affiche les information de l\'ennemis correctement', async () => {
    const enemy = {
      id: 1,
      name: 'Nermal',
      experience: 2,
      credit: 100,
      ship: {
        id: 1,
        name: 'Courrier',
        vitality: 50
      }
    };

    const wrapper = mount(BattleEnemy, {
      props: {
        enemy
      }
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.find('.header').text()).toBe('Nermal');
    expect(wrapper.find('h5').text()).toBe('Confirmé - 100 CG');
    expect(wrapper.find('.text-center').text()).toBe('Courrier');
    expect(wrapper.find('.progress-bar').attributes('style')).toContain('width: 100%');
  });

  it('affiche un message d\'erreur si l\'ennemis est manquant', async () => {
    const wrapper = mount(BattleEnemy, {
      props: {
        enemy: null
      }
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.find('.modal-mask').exists()).toBe(true);
  });
});


