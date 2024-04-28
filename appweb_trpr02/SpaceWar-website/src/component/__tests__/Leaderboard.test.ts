import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import Leaderboard from "../Leaderboard.vue";
import gameService from "../../scripts/gameService";

const mockFetchRankings = vi.mock(gameService, "fetchRankings");

describe("Leaderboard", () => {
  it("renders leaderboard items correctly", async () => {
    const mockRankings: { id: number; name: string; score: number }[] = [
      { id: 1, name: "Player 1", score: 100 },
      { id: 2, name: "Player 2", score: 200 },
    ];
    mockFetchRankings.resolve(mockRankings);

    const wrapper = mount(Leaderboard);

    await wrapper.vm.$nextTick();

    expect(wrapper.find("#leaderboard").exists()).toBe(true);
    expect(wrapper.findAll(".list-group-item").length).toBe(mockRankings.length);

    mockRankings.forEach((rank, index) => {
      expect(wrapper.find(`.list-group-item:nth-child(${index + 1})`).text()).toContain(rank.name);
      expect(wrapper.find(`.list-group-item:nth-child(${index + 1})`).text()).toContain(rank.score);
    });
  });

  it("displays error message when there's an error fetching rankings", async () => {
    const errorMessage = "Mock error";
    mockFetchRankings.reject(new Error(errorMessage));

    const wrapper = mount(Leaderboard);

    await wrapper.vm.$nextTick();

    expect(wrapper.find(".alert-danger").exists()).toBe(true);
    expect(wrapper.find(".alert-danger").text()).toContain("Une erreur est survenue lors du chargement du tableau de pointage.");
  });
});
