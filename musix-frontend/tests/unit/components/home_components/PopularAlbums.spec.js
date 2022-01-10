import { shallowMount } from '@vue/test-utils'
import PopularAlbums from '../../../../src/components/home_components/PopularAlbums.vue'

test('Redirects to album', async () => {
    const mockRouter = {
        push: jest.fn()
      }

    const wrapper = shallowMount(PopularAlbums, {
        global: {
          mocks: {
            $router: mockRouter
          }
        }
    })
  
    wrapper.vm.redirectToAlbum('test')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$router.push).toBeCalledWith('/album/test')
})