import { mount } from "@vue/test-utils";
import BattlePlayer from "../BattlePlayer.vue";
import { describe, expect, it } from "vitest";

describe('PlayerStatus', () => {
  it('affiche les informations du joueur correctement', async () => {
    const player = {
      id: 1,
      name: 'Garfield',
      credit: 200,
      vitality: 75
    };

    const wrapper = mount(BattlePlayer, {
        props: {
          player: player,
          shipName: 'Kart'
        }
      });

    await wrapper.vm.$nextTick();

    expect(wrapper.find('.header').text()).toBe('Garfield');
    expect(wrapper.find('h5').text()).toBe('Maitre - 200 CG');
    expect(wrapper.find('.text-center').text()).toBe('Kart');
    expect(wrapper.find('.progress-bar').attributes('style')).toContain('width: 75%');
  });

});
