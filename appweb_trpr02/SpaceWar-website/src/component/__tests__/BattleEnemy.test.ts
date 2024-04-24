import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BattleEnemy from '../BattleEnemy.vue'


//Doesn't work 
describe('BattleEnemy.vue', () => {
  it('Par défaut, un seul input est présent pour le nom du joueur.', async() => {
    const wrapper = mount(BattleEnemy)

    expect(wrapper.find('input').exists()).toBeTruthy()
  })
})