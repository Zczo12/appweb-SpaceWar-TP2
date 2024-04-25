import { mount } from "@vue/test-utils";
import AccueilForm from "../AccueilForm.vue";
import { describe, expect, it, vi } from "vitest";


describe('AccueilForm', () => {
  it('fetches ships and displays them in select options', async () => {
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

  it('emits update event with player name and selected ship on form submit', async () => {
    const wrapper = mount(AccueilForm);

    await wrapper.setData({
      currentPlayerName: 'Player 1',
      currentShip: { id: 1, name: 'Ship 1' },
    });

    await wrapper.find('form').trigger('submit.prevent');

    expect(wrapper.emitted('update')).toBeTruthy();
    expect(wrapper.emitted('update')[0]).toEqual(['Player 1', { id: 1, name: 'Ship 1' }]);
  });

  it('displays error popup if fetchShips fails', async () => {
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
