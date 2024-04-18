import { describe, it, expect, vi } from 'vitest';
import Leaderboard from '../Leaderboard.vue';
import { mount } from '@vue/test-utils';

vi.mock('../../scripts/gameService', () => {
    const ranking = [
        {
            id: 2,
            name: "Jym'Gil the Hutt",
            score: 495
        },
        {
            id: 1,
            name: 'Yan Maz Solo',
            score: 500
        },
        {
            id: 3,
            name: "Kath'rine Tanoor",
            score: 490
        }
    ];

    const fetchRankings = vi.fn();
    fetchRankings.mockResolvedValue(ranking);

    return {
        fetchRankings
    };
});

//Doesn't work 

describe('Leaderboard.vue', () => {
    it('Par défaut, une liste de joueurs est affichée', async () => {
        const wrapper = mount(Leaderboard);

        await wrapper.vm.$nextTick();

        // Check if the component contains the expected number of players
        expect(wrapper.findAll('.list-group-item')).toHaveLength(3);
    });
});
 