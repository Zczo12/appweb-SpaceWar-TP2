import { mount } from "@vue/test-utils";
import AccueilForm from "../AccueilForm.vue";
import { describe, expect, it } from "vitest";


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