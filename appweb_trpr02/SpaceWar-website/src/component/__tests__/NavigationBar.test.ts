import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import NavigationBar from "../NavigationBar.vue";
import { createRouter, createMemoryHistory } from 'vue-router';
import routes from "../../router/routes";

describe("NavigationBar", () => {
  it("navigates to '/' when 'Accueil' link is clicked", async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: routes 
    });

    const wrapper = mount(NavigationBar, {
      global: {
        plugins: [router]
      }
    });

    const accueilLink = wrapper.find('[to="/"]');
    
    await accueilLink.trigger("click");

    await router.isReady();

    expect(router.currentRoute.value.path).toBe('/');
  });

  it("navigates to '/leaderboard' when 'Leaderboard' link is clicked", async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: routes 
    });

    const wrapper = mount(NavigationBar, {
      global: {
        plugins: [router]
      }
    });

    const leaderboardLink = wrapper.find('[to="/leaderboard"]');
    
    await leaderboardLink.trigger("click");

    await router.isReady();

    expect(router.currentRoute.value.path).toBe('/leaderboard');
  });
});
