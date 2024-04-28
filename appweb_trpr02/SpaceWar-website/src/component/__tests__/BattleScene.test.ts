import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import BattleScene from '../BattleScene.vue'

describe('BattleScene.vue', () => {

  it('should emit attack event correctly', async () => {
    const wrapper = mount(BattleScene)
    
    wrapper.vm.$emit('notifyAttack', 10, 20)
    await wrapper.vm.$nextTick()
    
    expect(wrapper.emitted('attack')).toBeTruthy()
    expect(wrapper.emitted('attack')).toEqual([10, 20])
  })
  
  it('should emit nextMission event with false when handleNextMission is called with false', () => {
    const wrapper = mount(BattleScene)
    
    wrapper.vm.$emit('handleNextMission', 1, false)
    
    expect(wrapper.emitted('nextMission')).toBeTruthy()
    expect(wrapper.emitted('nextMission')).toEqual([1, false])
  })
  
  it('should emit nextMission event with true when handleNextMission is called with true', () => {
    const wrapper = mount(BattleScene)
    
    wrapper.vm.$emit('handleNextMission', 1, true)
    
    expect(wrapper.emitted('nextMission')).toBeTruthy()
    expect(wrapper.emitted('nextMission')).toEqual([1, true])
  })
  
  it('should emit go to main menu event when goToMainMenu is called', () => {
    const wrapper = mount(BattleScene)
    
    wrapper.vm.$emit('goToMainMenu')
    
    expect(wrapper.emitted('goToMainMenu')).toBeTruthy()
  })
  
  it('should emit go to leaderboard event when goToLeaderBoard is called', async () => {
    const wrapper = mount(BattleScene)

    wrapper.vm.$emit('goToLeaderBoard')
    
    expect(wrapper.emitted('goToLeaderBoard')).toBeTruthy()
  })
})
