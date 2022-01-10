import { shallowMount } from '@vue/test-utils'
import PopularItem from '../../../../src/components/home_components/PopularItem.vue'

test('Props are set correctly', async () => {
  const wrapper = shallowMount(PopularItem, {
    propsData: {
        index: 1,
        name: 'test'
    }
  })

  expect(wrapper.text().includes('1')).toBe(true)
  expect(wrapper.text().includes('test')).toBe(true)
})

test('Redirects to page', async () => {
    const mockRouter = {
        push: jest.fn()
      }

    const wrapper = shallowMount(PopularItem, {
        global: {
          mocks: {
            $router: mockRouter
          }
        },
        propsData: {
          id: 'test',
          type: 'test'
        }
    })
  
    wrapper.vm.redirectToPage()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$router.push).toBeCalledWith('/test/test')
})