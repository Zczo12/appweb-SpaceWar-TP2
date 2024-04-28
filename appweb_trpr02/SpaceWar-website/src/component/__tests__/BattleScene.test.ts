import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import BattleScene from '../BattleScene.vue'

describe('BattleScene.vue', () => {
  it('la méthode attack est appelée correctement', async () => {
    const wrapper = mount(BattleScene)
    
    wrapper.vm.$emit('notifyAttack', 10, 20)
    await wrapper.vm.$nextTick()
    
    expect(wrapper.emitted('attack')).toBeTruthy()
    expect(wrapper.emitted('attack')).toEqual([10, 20])
  })
  
  it('devrait émettre un événement nextMission avec false lorsque handleNextMission est appelé avec false', () => {
    const wrapper = mount(BattleScene)
    
    wrapper.vm.$emit('handleNextMission', 1, false)
    
    expect(wrapper.emitted('nextMission')).toBeTruthy()
    expect(wrapper.emitted('nextMission')).toEqual([1, false])
  })
  
  it('devrait émettre un événement nextMission avec true lorsque handleNextMission est appelé avec true', () => {
    const wrapper = mount(BattleScene)
    
    wrapper.vm.$emit('handleNextMission', 1, true)
    
    expect(wrapper.emitted('nextMission')).toBeTruthy()
    expect(wrapper.emitted('nextMission')).toEqual([1, true])
  })
  
  it('devrait émettre un événement pour aller au menu principal lorsque la fonction goToMainMenu est appelée', () => {
    const wrapper = mount(BattleScene)
    
    wrapper.vm.$emit('goToMainMenu')
    
    expect(wrapper.emitted('goToMainMenu')).toBeTruthy()
  })
  
  it('devrait émettre un événement pour aller au tableau des scores lorsque la fonction goToLeaderboard est appelée', async () => {
    const wrapper = mount(BattleScene)

    wrapper.vm.$emit('goToLeaderBoard')
    
    expect(wrapper.emitted('goToLeaderBoard')).toBeTruthy()
  })
})
