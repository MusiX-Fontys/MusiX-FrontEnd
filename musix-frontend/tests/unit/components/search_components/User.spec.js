import { shallowMount } from '@vue/test-utils'
import User from '../../../../src/components/search_components/User.vue'

test('Redirects to track', async () => {
    const mockRouter = {
        push: jest.fn()
      }

    const wrapper = shallowMount(User, {
        global: {
          mocks: {
            $router: mockRouter
          }
        },
        propsData: {
          id: 'test',
          joinDate: new Date()
        }
    })
  
    wrapper.vm.redirectToProfile()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$router.push).toBeCalledWith('/profile/test')
})