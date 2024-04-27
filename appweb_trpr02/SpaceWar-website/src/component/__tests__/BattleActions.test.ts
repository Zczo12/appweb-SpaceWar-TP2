import { mount } from "@vue/test-utils";
import BattleActions from "../BattleActions.vue";
import { describe, expect, it } from "vitest";

describe('YourComponent', () => {
  it('should emit battle event when attack button is clicked', async () => {
    const player = {
        id: 1,
        name: 'Player 1',
        credit: 200,
        vitality: 75
    };

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

    const wrapper = mount(BattleActions, {
      props: {
        player: player,
        enemy: enemy
      }
    });

    await wrapper.find('button.btn-primary:nth-of-type(1)').trigger('click');
    expect(wrapper.emitted('battle')).toBeTruthy();
  });

  it('should emit endMission event with false when end mission button is clicked', async () => {
    const player = {
        id: 1,
        name: 'Player 1',
        credit: 200,
        vitality: 75
    };

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

    const wrapper = mount(BattleActions, {
      props: {
        player: player,
        enemy: enemy
      }
    });

    await wrapper.find('button.btn-primary:nth-of-type(2)').trigger('click');
    const endMissionEvent = wrapper.emitted('endMission');
    expect(endMissionEvent).toBeTruthy();
    expect(endMissionEvent?.[0][0]).toBe(1); // missionCounter should be 1
    expect(endMissionEvent?.[0][1]).toBe(false); // heal should be false
    
  });

  it('should emit endMission event with true when healAndEndMission button is clicked', async () => {
    const player = {
        id: 1,
        name: 'Player 1',
        credit: 200,
        vitality: 75
    };

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

    const wrapper = mount(BattleActions, {
      props: {
        player: player,
        enemy: enemy
      }
    });

    await wrapper.find('button.btn-primary:nth-of-type(3)').trigger('click');
    const endMissionEvent = wrapper.emitted('endMission');
    expect(endMissionEvent).toBeDefined(); // Check if emitted event is defined
    expect(endMissionEvent?.[0][0]).toBe(1); // missionCounter should be 1
    expect(endMissionEvent?.[0][1]).toBe(true); // heal should be true

  });

  it('displays error popup if player data is missing', async () => {
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

    const wrapper = mount(BattleActions, {
      props: {
        player: null,
        enemy: enemy
      }
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.find('.modal-mask').exists()).toBe(true);
  });

  it('displays error popup if enemy data is missing', async () => {

    const player = {
        id: 1,
        name: 'Player 1',
        credit: 200,
        vitality: 75
    };

    const wrapper = mount(BattleActions, {
      props: {
        player: player,
        enemy: null
      }
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.find('.modal-mask').exists()).toBe(true);
  });


});
