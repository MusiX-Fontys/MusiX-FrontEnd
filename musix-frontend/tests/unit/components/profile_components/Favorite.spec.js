import { shallowMount } from '@vue/test-utils'
import Favorite from '../../../../src/components/profile_components/Favorite.vue'

test('Props are set correctly', async () => {
  const wrapper = shallowMount(Favorite, {
    propsData: {
        type: 'Test',
        item: { name: 'test' }
    }
  })

  expect(wrapper.text().includes('Test')).toBe(true)
  expect(wrapper.text().includes('test')).toBe(true)
})

test('Redirects to page', async () => {
    const mockRouter = {
        push: jest.fn()
      }

    const wrapper = shallowMount(Favorite, {
        global: {
          mocks: {
            $router: mockRouter
          }
        },
        propsData: {
          type: 'Test',
          item: { id: 'test' }
        }
    })
  
    wrapper.vm.redirectToPage()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$router.push).toBeCalledWith('/test/test')
})