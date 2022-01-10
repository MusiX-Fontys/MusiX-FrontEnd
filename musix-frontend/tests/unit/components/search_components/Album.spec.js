import { shallowMount } from '@vue/test-utils'
import Album from '../../../../src/components/search_components/Album.vue'

test('Redirects to track', async () => {
    const mockRouter = {
        push: jest.fn()
      }

    const wrapper = shallowMount(Album, {
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
  
    wrapper.vm.redirectToAlbum()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$router.push).toBeCalledWith('/album/test')
})