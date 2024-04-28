import { mount } from "@vue/test-utils";
import { describe, it, expect, beforeEach } from "vitest";
import NavigationBar from "../NavigationBar.vue";
import { createRouter, createMemoryHistory, Router } from 'vue-router';

describe("NavigationBar", () => {
  let router : Router;

  beforeEach(() => {
    router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: "/", name: "Accueil" },
        { path: "/leaderboard", name: "Leaderboard" }
      ]
    });
  });

  it("Une image est présente dans la bar de navigation", () => {
    const wrapper = mount(NavigationBar, {
      global: {
        plugins: [router]
      }
    });
    
    const img = wrapper.find("img");
    expect(img.exists()).toBe(true);
  });

  it("Les pages sont visisble dans la bar de navigation", () => {
    const wrapper = mount(NavigationBar, {
      global: {
        plugins: [router]
      }
    });

    const linkList = wrapper.find("ul.navbar-nav");
    const links = linkList.findAll("li.nav-item");
    expect(linkList.exists()).toBe(true);
    expect(links.length).toBe(2);
  });
});
