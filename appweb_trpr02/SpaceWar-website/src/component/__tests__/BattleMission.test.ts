import { mount } from "@vue/test-utils";
import BattleMission from "../BattleMission.vue";
import { describe, expect, it } from "vitest";

describe('BattleEnemy', () => {
    it('displays enemy information correctly', async () => {
      const wrapper = mount(BattleMission, {
        props: {
          missionCounter: 3
        }
      });
  
      await wrapper.vm.$nextTick();
  
      expect(wrapper.find('h5').text()).toBe('3/5');
    });
  
    it('displays error popup if loading fails', async () => {
      const wrapper = mount(BattleMission, {
        props: {
          missionCounter: null
        }
      });
  
      await wrapper.vm.$nextTick();
  
      expect(wrapper.find('.modal-mask').exists()).toBe(true);
    });
  });