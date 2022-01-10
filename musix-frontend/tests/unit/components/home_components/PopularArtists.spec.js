import { shallowMount } from '@vue/test-utils'
import PopularArtists from '../../../../src/components/home_components/PopularArtists.vue'

test('Redirects to artist', async () => {
    const mockRouter = {
        push: jest.fn()
      }

    const wrapper = shallowMount(PopularArtists, {
        global: {
          mocks: {
            $router: mockRouter
          }
        }
    })
  
    wrapper.vm.redirectToArtist('test')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$router.push).toBeCalledWith('/artist/test')
})