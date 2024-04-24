import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BattleActions from '../BattleActions.vue'
import gameService from '../../scripts/gameService'


//Doesn't work 
describe('BattleActions.vue', () => {
  it('', async() => {
    const wrapper = mount(BattleActions)

    //expect(wrapper.find('input').exists()).toBeTruthy()
  })
})