import { shallowMount } from '@vue/test-utils'
import RecentlyPlayed from '../../../../src/components/profile_components/RecentlyPlayed.vue'

test('Props are set correctly', async () => {
  const wrapper = shallowMount(RecentlyPlayed, {
    propsData: {
        name: 'testName',
        playedAt: 'testTime'
    }
  })

  expect(wrapper.text().includes('testName')).toBe(true)
  expect(wrapper.text().includes('testTime')).toBe(true)
})

test('Redirects to track', async () => {
    const mockRouter = {
        push: jest.fn()
      }

    const wrapper = shallowMount(RecentlyPlayed, {
        global: {
          mocks: {
            $router: mockRouter
          }
        },
        propsData: {
          id: 'test' 
        }
    })
  
    wrapper.vm.redirectToTrack()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$router.push).toBeCalledWith('/track/test')
})