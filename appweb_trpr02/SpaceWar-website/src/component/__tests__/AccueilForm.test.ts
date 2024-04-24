import { mount } from "@vue/test-utils";
import AccueilForm from "../AccueilForm.vue";
import { describe, expect, it } from "vitest";

describe("AccueilForm", () => {
  it("shows the element when a condition is met", async () => {
    const wrapper = mount(AccueilForm);

    expect(wrapper.exists())
  });
});


/* could be useful
np
describe('LoginView', () => {
  let wrapper
  let router

  beforeEach(async () => {
    router = createRouter({
      history: createWebHistory(),
      routes,
    })
    await router.isReady()
    wrapper = mount(LoginView, {
      global: {
        plugins: [router]
      }
    })
  })

  */