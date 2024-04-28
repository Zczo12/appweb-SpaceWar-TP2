import { mount } from "@vue/test-utils";
import BattleMission from "../BattleMission.vue";
import { describe, expect, it } from "vitest";

describe('BattleEnemy', () => {
    it('affiche le compteur de mission correctement', async () => {
      const wrapper = mount(BattleMission, {
        props: {
          missionCounter: 3
        }
      });
  
      await wrapper.vm.$nextTick();
  
      expect(wrapper.find('h5').text()).toBe('3/5');
    });
  
    it('affiche un message d\'erreur si le compteur de mission est manquant', async () => {
      const wrapper = mount(BattleMission, {
        props: {
          missionCounter: null
        }
      });
  
      await wrapper.vm.$nextTick();
  
      expect(wrapper.find('.modal-mask').exists()).toBe(true);
    });
  });