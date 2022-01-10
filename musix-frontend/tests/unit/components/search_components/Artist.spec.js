import { shallowMount } from '@vue/test-utils'
import Artist from '../../../../src/components/search_components/Artist.vue'

test('Redirects to track', async () => {
    const mockRouter = {
        push: jest.fn()
      }

    const wrapper = shallowMount(Artist, {
        global: {
          mocks: {
            $router: mockRouter
          }
        },
        propsData: {
          id: 'test',
          genres: []
        }
    })
  
    wrapper.vm.redirectToArtist()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$router.push).toBeCalledWith('/artist/test')
})