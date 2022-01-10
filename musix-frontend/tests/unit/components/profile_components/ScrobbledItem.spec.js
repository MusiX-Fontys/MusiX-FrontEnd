import { shallowMount } from '@vue/test-utils'
import ScrobbledItems from '../../../../src/components/profile_components/ScrobbledItems.vue'

test('Props are set correctly', async () => {
  const wrapper = shallowMount(ScrobbledItems, {
    propsData: {
        items: [
          {
            track: {
              name: 'test'
            },
            scrobbleAmount: 1
          }
        ],
        type: 'track'
    }
  })

  expect(wrapper.text().includes('test')).toBe(true)
  expect(wrapper.text().includes('1')).toBe(true)
})

test('Redirects to page', async () => {
    const mockRouter = {
        push: jest.fn()
      }

    const wrapper = shallowMount(ScrobbledItems, {
        global: {
          mocks: {
            $router: mockRouter
          }
        },
        propsData: {
          items: [
          {
            track: {
              name: 'test'
            },
            scrobbleAmount: 1
          }
        ],
          type: 'track' 
        }
    })
  
    wrapper.vm.redirectToPage('test')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$router.push).toBeCalledWith('/track/test')
})