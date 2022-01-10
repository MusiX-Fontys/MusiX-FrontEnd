import { shallowMount } from '@vue/test-utils'
import Track from '../../../../src/components/search_components/Track.vue'

test('Redirects to track', async () => {
    const mockRouter = {
        push: jest.fn()
      }

    const wrapper = shallowMount(Track, {
        global: {
          mocks: {
            $router: mockRouter
          }
        },
        propsData: {
          id: 'test',
          artists: []
        }
    })
  
    wrapper.vm.redirectToTrack()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$router.push).toBeCalledWith('/track/test')
})