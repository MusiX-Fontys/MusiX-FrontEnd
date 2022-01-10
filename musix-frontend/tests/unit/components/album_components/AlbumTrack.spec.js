import { shallowMount } from '@vue/test-utils'
import AlbumTrack from '../../../../src/components/album_components/AlbumTrack.vue'

test('Props are set correctly', async () => {
  const wrapper = shallowMount(AlbumTrack, {
    propsData: {
        index: 1,
        name: 'test',
        duration: 60000
    }
  })

  expect(wrapper.text().includes('1')).toBe(true)
  expect(wrapper.text().includes('test')).toBe(true)
  expect(wrapper.text().includes('1:00')).toBe(true)
})

test('Redirect to track', async () => {
    const mockRouter = {
        push: jest.fn()
      }

    const wrapper = shallowMount(AlbumTrack, {
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

test('Set milliseconds to minutes', async () => {
  const wrapper = shallowMount(AlbumTrack, {
      propsData: {
        duration: 223000
      }
  })

  expect(wrapper.vm.millisecondsToMinutes()).toBe('3:43')
})