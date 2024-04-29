import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import Leaderboard from "../Leaderboard.vue";

describe("Leaderboard", () => {
  it("Les rankings sont bien chargés lorsque la page du leaderboard est chargée", async () => {
    const mockRankings = [
      { id: 1, name: "Player 1", score: 100 },
      { id: 2, name: "Player 2", score: 200 },
    ];

    const wrapper = mount(Leaderboard, {
      props: {
        listRankings: mockRankings,
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.find("#leaderboard").exists()).toBe(true);
    expect(wrapper.findAll(".list-group-item").length).toBe(mockRankings.length);

    mockRankings.forEach((rank, index) => {
      expect(wrapper.find(`.list-group-item:nth-child(${index + 1})`).text()).toContain(rank.name);
      expect(wrapper.find(`.list-group-item:nth-child(${index + 1})`).text()).toContain(rank.score);
    });
  });
});
