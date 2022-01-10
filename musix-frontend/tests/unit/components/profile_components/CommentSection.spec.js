import { shallowMount } from '@vue/test-utils'
import CommentSection from '../../../../src/components/profile_components/CommentSection.vue'

test('Redirects to profile', async () => {
    const mockRouter = {
        push: jest.fn()
      }

    const wrapper = shallowMount(CommentSection, {
        global: {
          mocks: {
            $router: mockRouter
          }
        },
        propsData: {
          comments: []
        }
    })
  
    wrapper.vm.redirectToProfile('test')
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$router.push).toBeCalledWith('/profile/test')
})

test('Gets user info', () => {
  global.localStorage.setItem('jwt', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkNjIwMDBmZi1kYzcyLTQ5ZWUtYmY1OC1hNjlmMGViMmFhOWEiLCJzdWIiOiI3N2Y5YzQxOS1lOWYwLTRkNDgtOGQxZS01ZDBjYmVlMzY4MDEiLCJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImZvbnR5cy5tdXNpeEBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW5pc3RyYXRvciIsImV4cCI6MTY0MjAwMTEzNSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3QifQ.3JS4iaoesPkBwnM-LyQJx_-11mPRPFF3DKMMsx7X-PE')

  const wrapper = shallowMount(CommentSection, {
    propsData: {
      comments: []
    }
})

  const claims = wrapper.vm.getUserInfo()

  expect(claims.id).toBe('77f9c419-e9f0-4d48-8d1e-5d0cbee36801')
  expect(claims.name).toBe('admin')
})