import { mount } from "@vue/test-utils";
import BattlePlayer from "../BattlePlayer.vue";
import { describe, expect, it } from "vitest";

describe('PlayerStatus', () => {
  it('displays player information correctly', async () => {
    const player = {
      id: 1,
      name: 'Garfield',
      credit: 200,
      vitality: 75
    };

    const wrapper = mount(BattlePlayer, {
        props: {
          player: player,
          shipName: 'Car'
        }
      });

    await wrapper.vm.$nextTick();

    expect(wrapper.find('.header').text()).toBe('Garfield');
    expect(wrapper.find('h5').text()).toBe('Maitre - 200 CG');
    expect(wrapper.find('.text-center').text()).toBe('Car');
    expect(wrapper.find('.progress-bar').attributes('style')).toContain('width: 75%');
  });

  it('displays error popup if player data is missing', async () => {
    const wrapper = mount(BattlePlayer, {
        props: {
          player: null,
          shipName: 'Player Ship'
        }
      });

    await wrapper.vm.$nextTick();

    expect(wrapper.find('.modal-mask').exists()).toBe(true);
  });

  it('displays error popup if shipName data is missing', async () => {
    const player = {
        id: 1,
        name: 'Player 1',
        credit: 200,
        vitality: 75
    };

    const wrapper = mount(BattlePlayer, {
        props: {
          player: player,
          shipName: null
        }
      });

    await wrapper.vm.$nextTick();

    expect(wrapper.find('.modal-mask').exists()).toBe(true);
  });
});
