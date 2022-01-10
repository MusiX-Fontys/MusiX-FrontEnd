import { shallowMount } from '@vue/test-utils'
import PopularTracks from '../../../../src/components/home_components/PopularTracks.vue'

test('Redirects to track', async () => {
    const mockRouter = {
        push: jest.fn()
      }

    const wrapper = shallowMount(PopularTracks, {
        global: {
          mocks: {
            $router: mockRouter
          }
        }
    })
  
    wrapper.vm.redirectToTrack('test')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$router.push).toBeCalledWith('/track/test')
})