import { mount } from "@vue/test-utils";
import BattleActions from "../BattleActions.vue";
import { describe, expect, it, beforeEach } from "vitest";
import { Characters, Player } from "../../scripts/gameService";

describe('YourComponent', () => {

  let player : Player;
  let enemy : Characters;

  beforeEach(() => {
    player = {
      name: 'Garfield',
      credit: 200,
      vitality: 75
    };

    enemy = {
      id: 1,
      name: 'Nermal',
      experience: 2,
      credit: 100,
      ship: {
        id: 1,
        name: 'Courier',
        vitality: 50
      }
    };
  });

  it('devrait émettre battle quand le boutton Combattre est cliqué', async () => {
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

  it('devrait émettre endMission sans soin quand le boutton Terminer la mission est cliqué', async () => {
    const wrapper = mount(BattleActions, {
      props: {
        player: player,
        enemy: enemy
      }
    });

    enemy.ship.vitality = 0;

    await wrapper.find('[data-testid="end-mission-button"]').trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('endMission')).toBeTruthy();
    expect(wrapper.emitted('endMission')[0][1]).toBe(false);
  });

  it('devrait émettre endMission avec soin quand le boutton Terminer la mission et réparer le vaisseau est cliqué', async () => {
    const wrapper = mount(BattleActions, {
      props: {
        player: player,
        enemy: enemy
      }
    });

    enemy.ship.vitality = 0;
    
    await wrapper.find('[data-testid="heal-and-end-mission-button"]').trigger('click');
    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('endMission')).toBeTruthy();
    expect(wrapper.emitted('endMission')[0][1]).toBe(true);
  });
});
