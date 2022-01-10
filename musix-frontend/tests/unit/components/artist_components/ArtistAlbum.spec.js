import { shallowMount } from '@vue/test-utils'
import ArtistAlbum from '../../../../src/components/artist_components/ArtistAlbum.vue'

test('Props are set correctly', async () => {
  const wrapper = shallowMount(ArtistAlbum, {
    propsData: {
        name: 'test'
    }
  })

  expect(wrapper.text().includes('test')).toBe(true)
})

test('Redirects to album', async () => {
    const mockRouter = {
        push: jest.fn()
      }

    const wrapper = shallowMount(ArtistAlbum, {
        global: {
          mocks: {
            $router: mockRouter
          }
        },
        propsData: {
          id: 'test'
        }
    })
  
    wrapper.vm.redirectToAlbum()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$router.push).toBeCalledWith('/album/test')
})