import { mount } from "@vue/test-utils";
import BattleEnemy from "../BattleEnemy.vue";
import { describe, expect, it } from "vitest";

describe('BattleEnemy', () => {
  it('displays enemy information correctly', async () => {
    const enemy = {
      id: 1,
      name: 'Enemy 1',
      experience: 2,
      credit: 100,
      ship: {
        id: 1,
        name: 'Enemy Ship',
        vitality: 50
      }
    };

    const wrapper = mount(BattleEnemy, {
      props: {
        enemy
      }
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.find('.header').text()).toBe('Enemy 1');
    expect(wrapper.find('h5').text()).toBe('Confirmé - 100 CG');
    expect(wrapper.find('.text-center').text()).toBe('Enemy Ship');
    expect(wrapper.find('.progress-bar').attributes('style')).toContain('width: 100%');
  });

  it('displays error popup if loading fails', async () => {
    const wrapper = mount(BattleEnemy, {
      props: {
        enemy: null
      }
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.find('.modal-mask').exists()).toBe(true);
  });
});


