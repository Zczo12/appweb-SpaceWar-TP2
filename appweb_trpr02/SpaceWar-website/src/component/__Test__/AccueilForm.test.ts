import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AccueilForm from '../AccueilForm.vue'
import gameService from '../../scripts/gameService'


//Doesn't work 
describe('AccueilForm.vue', () => {
  it('Par défaut, un seul input est présent pour le nom du joueur.', async() => {
    const wrapper = mount(AccueilForm)

    expect(wrapper.find('input').exists()).toBeTruthy()
  })
})