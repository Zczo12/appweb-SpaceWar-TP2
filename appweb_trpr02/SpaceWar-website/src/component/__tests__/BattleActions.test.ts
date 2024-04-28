import { mount } from "@vue/test-utils";
import BattleActions from "../BattleActions.vue";
import { describe, expect, it } from "vitest";

describe('YourComponent', () => {
  it('devrait émettre battle quand le boutton "Combattre" est cliqué', async () => {
    const player = {
      id: 1,
      name: 'Garfield',
      credit: 200,
      vitality: 75
    };

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

    const wrapper = mount(BattleActions, {
      props: {
        player: player,
        enemy: enemy
      }
    });

    await wrapper.find('[data-testid="attack-button"]').trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('battle')).toBeTruthy();
  });

  it('devrait émettre endMission sans soin quand le boutton "Terminer la mission" est cliqué', async () => {
    const player = {
      id: 1,
      name: 'Garfield',
      credit: 200,
      vitality: 75
    };

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

    const wrapper = mount(BattleActions, {
      props: {
        player: player,
        enemy: enemy
      }
    });

    await wrapper.find('[data-testid="end-mission-button"]').trigger('click');
    await wrapper.vm.$nextTick();

    const endMissionEvent = wrapper.emitted('endMission');
    expect(endMissionEvent).toBeTruthy();
    expect(endMissionEvent?.[0][0]).toBe(1);
    expect(endMissionEvent?.[0][1]).toBe(false);
  });

  it('devrait émettre endMission avec soin quand le boutton "Terminer la mission et réparer le vaisseau" est cliqué', async () => {
    const player = {
      id: 1,
      name: 'Garfield',
      credit: 200,
      vitality: 75
    };

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

    const wrapper = mount(BattleActions, {
      props: {
        player: player,
        enemy: enemy
      }
    });

    await wrapper.find('[data-testid="heal-and-end-mission-button"]').trigger('click');
    await wrapper.vm.$nextTick();

    const endMissionEvent = wrapper.emitted('endMission');
    expect(endMissionEvent).toBeDefined();
    expect(endMissionEvent?.[0][0]).toBe(1);
    expect(endMissionEvent?.[0][1]).toBe(true);
  });
});
