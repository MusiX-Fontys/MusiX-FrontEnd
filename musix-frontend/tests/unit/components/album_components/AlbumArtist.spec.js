import { shallowMount } from '@vue/test-utils'
import AlbumArtist from '../../../../src/components/album_components/AlbumArtist.vue'

test('Props are set correctly', async () => {
  const wrapper = shallowMount(AlbumArtist, {
    propsData: {
        name: 'test'
    }
  })

  expect(wrapper.text().includes('test')).toBe(true)
})

test('Redirects to artist', async () => {
    const mockRouter = {
        push: jest.fn()
      }

    const wrapper = shallowMount(AlbumArtist, {
        global: {
          mocks: {
            $router: mockRouter
          }
        },
        propsData: {
          id: 'test'
        }
    })
  
    wrapper.vm.redirectToArtist()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$router.push).toBeCalledWith('/artist/test')
})