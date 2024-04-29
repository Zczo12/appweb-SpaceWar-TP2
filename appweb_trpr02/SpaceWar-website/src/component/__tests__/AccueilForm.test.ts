import { mount } from "@vue/test-utils";
import AccueilForm from "../AccueilForm.vue";
import { describe, expect, it } from "vitest";

describe('AccueilForm', () => {
  it('récupère des vaisseaux et les affiche dans des options', async () => {
    const mockShips = [
      { id: 1, name: 'Ship 1' },
      { id: 2, name: 'Ship 2' },
    ];

    const wrapper = mount(AccueilForm, {
      props: {
        listShips: mockShips,
      },
    });

    await wrapper.vm.$nextTick();

    const options = wrapper.findAll('select option');
    expect(options).toHaveLength(mockShips.length + 1); 
    mockShips.forEach((ship, index) => {
      expect(options[index + 1].text()).toBe(ship.name);
    });
  });

  it('émet un événement de mise à jour avec le nom du joueur et le vaisseau sélectionné à la soumission du formulaire', async () => {
    const wrapper = mount(AccueilForm, {
      data() {
        return {
          currentPlayerName: 'Player 1',
          currentShip: { id: 1, name: 'Ship 1' }
        };
      }
    });

    await wrapper.find('form').trigger('submit');

    expect(wrapper.emitted()).toHaveProperty('update');
  });

  it('Est ce que un select est présent dans la page initial', () => {
    const wrapper = mount(AccueilForm);
    expect(wrapper.find('select').exists()).toBe(true);
  });

  it('Est ce que un input type text est présent dans la page initial', () => {
    const wrapper = mount(AccueilForm);
    expect(wrapper.find('input[type="text"]').exists()).toBe(true);
  });

  it('Est ce que un button est présent dans la page initial', () => {
    const wrapper = mount(AccueilForm);
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
  });

  it('La valuer dans le input type text peut être modifier', async () => {
    const wrapper = mount(AccueilForm);

    const input = wrapper.find('input[type="text"]');

    await input.setValue('John Doe');

    //Dit qu'il y a une erreur mais fonctionne
    expect(input.element.value).toBe('John Doe');
  });
});
