import { mount } from "@vue/test-utils";
import AccueilForm from "../AccueilForm.vue";
import { describe, expect, it, vi } from "vitest";

describe('AccueilForm', () => {
  it('récupère des vaisseaux et les affiche dans des options', async () => {
    const mockShips = [
      { id: 1, name: 'Ship 1' },
      { id: 2, name: 'Ship 2' },
    ];

    const fetchShipsMock = vi.fn().mockResolvedValue(mockShips);

    vi.mock('../scripts/gameService', () => ({
      __esModule: true,
      default: {
        fetchShips: fetchShipsMock,
      },
    }));

    const wrapper = mount(AccueilForm);

    await wrapper.vm.$nextTick();

    expect(fetchShipsMock).toHaveBeenCalled();

    const options = wrapper.findAll('select option');
    expect(options).toHaveLength(mockShips.length + 1); 
    mockShips.forEach((ship, index) => {
      expect(options[index + 1].text()).toBe(ship.name);
    });
  });

  it('émet un événement de mise à jour avec le nom du joueur et le vaisseau sélectionné à la soumission du formulaire', async () => {
    const wrapper = mount(AccueilForm);

    await wrapper.setData({
      $data: {
        currentPlayerName: 'Player 1',
        currentShip: { id: 1, name: 'Ship 1' },
      }
    });

    await wrapper.find('form').trigger('submit.prevent');

    expect(wrapper.emitted('update')).toBeTruthy();
    expect(wrapper.emitted('update')[0]).toEqual(['Player 1', { id: 1, name: 'Ship 1' }]);
  });

  it('affiche une fenêtre contextuelle d\'erreur si fetchShips échoue', async () => {
    const fetchShipsMock = vi.fn().mockRejectedValue(new Error('Failed to fetch ships'));

    vi.mock('../scripts/gameService', () => ({
      __esModule: true,
      default: {
        fetchShips: fetchShipsMock,
      },
    }));

    const wrapper = mount(AccueilForm);

    await wrapper.vm.$nextTick();

    expect(fetchShipsMock).toHaveBeenCalled();

    expect(wrapper.find('.modal-mask').exists()).toBe(true);
  });
});
