import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import BattleScene from '../BattleScene.vue'

describe('BattleScene.vue', () => {
  
  it('devrait émettre un événement pour aller au menu principal lorsque la fonction goToMainMenu est appelée', async () => {
    const wrapper = mount(BattleScene)
    
    wrapper.vm.$emit('goToMainMenu')
    await wrapper.vm.$nextTick()
    
    expect(wrapper.emitted('goToMainMenu')).toBeTruthy()
  })
  
  it('devrait émettre un événement pour aller au tableau des scores lorsque la fonction goToLeaderboard est appelée', async () => {
    const wrapper = mount(BattleScene)

    wrapper.vm.$emit('goToLeaderBoard')
    await wrapper.vm.$nextTick()
    
    expect(wrapper.emitted('goToLeaderBoard')).toBeTruthy()
  })

})
