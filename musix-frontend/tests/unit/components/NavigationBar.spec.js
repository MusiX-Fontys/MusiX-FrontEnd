import { shallowMount } from '@vue/test-utils'
import NavigationBar from '../../../src/components/NavigationBar.vue'

test('Displays unauthorized navbar', () => {
  const wrapper = shallowMount(NavigationBar)

  expect(wrapper.text().includes('Sign In')).toBe(true)
  expect(wrapper.text().includes('Sign Up')).toBe(true)
})

test('Displays authorized navbar', () => {
  global.localStorage.setItem('jwt', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkNjIwMDBmZi1kYzcyLTQ5ZWUtYmY1OC1hNjlmMGViMmFhOWEiLCJzdWIiOiI3N2Y5YzQxOS1lOWYwLTRkNDgtOGQxZS01ZDBjYmVlMzY4MDEiLCJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImZvbnR5cy5tdXNpeEBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW5pc3RyYXRvciIsImV4cCI6MTY0MjAwMTEzNSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3QifQ.3JS4iaoesPkBwnM-LyQJx_-11mPRPFF3DKMMsx7X-PE')

  const wrapper = shallowMount(NavigationBar)

  expect(wrapper.text().includes('Profile')).toBe(true)
  expect(wrapper.text().includes('Log Out')).toBe(true)
})

test('User is not logged in', () => {
  global.localStorage.clear()

  const wrapper = shallowMount(NavigationBar)

  expect(wrapper.vm.isUserLoggedIn()).toBe(false)
})

test('User is logged in', () => {
  global.localStorage.setItem('jwt', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkNjIwMDBmZi1kYzcyLTQ5ZWUtYmY1OC1hNjlmMGViMmFhOWEiLCJzdWIiOiI3N2Y5YzQxOS1lOWYwLTRkNDgtOGQxZS01ZDBjYmVlMzY4MDEiLCJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImZvbnR5cy5tdXNpeEBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW5pc3RyYXRvciIsImV4cCI6MTY0MjAwMTEzNSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3QifQ.3JS4iaoesPkBwnM-LyQJx_-11mPRPFF3DKMMsx7X-PE')

  const wrapper = shallowMount(NavigationBar)

  expect(wrapper.vm.isUserLoggedIn()).toBe(true)
})

test('Gets user id', () => {
  global.localStorage.setItem('jwt', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkNjIwMDBmZi1kYzcyLTQ5ZWUtYmY1OC1hNjlmMGViMmFhOWEiLCJzdWIiOiI3N2Y5YzQxOS1lOWYwLTRkNDgtOGQxZS01ZDBjYmVlMzY4MDEiLCJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImZvbnR5cy5tdXNpeEBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW5pc3RyYXRvciIsImV4cCI6MTY0MjAwMTEzNSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3QifQ.3JS4iaoesPkBwnM-LyQJx_-11mPRPFF3DKMMsx7X-PE')

  const wrapper = shallowMount(NavigationBar)

  expect(wrapper.vm.getUserId()).toBe('77f9c419-e9f0-4d48-8d1e-5d0cbee36801')
})

test('Set search redirect url', async () => {
  const mockRouter = {
    push: jest.fn()
  }
  const wrapper = shallowMount(NavigationBar, {
    global: {
      mocks: {
        $router: mockRouter
      }
    },
    data() {
      return {
        search: 'test'
      }
    }
  })

  wrapper.vm.handleSearch()
  await wrapper.vm.$nextTick()
  expect(wrapper.vm.search).toBe('')
  expect(wrapper.vm.$router.push).toBeCalledWith('/search/test')
})

test('Set redirect url', async () => {
  const mockRouter = {
    push: jest.fn()
  }
  const wrapper = shallowMount(NavigationBar, {
    global: {
      mocks: {
        $router: mockRouter
      }
    }
  })

  wrapper.vm.redirectToPage('/profile')
  await wrapper.vm.$nextTick()
  expect(wrapper.vm.$router.push).toBeCalledWith('/profile')
})

test('Logs user out', async () => {
  global.localStorage.setItem('jwt', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkNjIwMDBmZi1kYzcyLTQ5ZWUtYmY1OC1hNjlmMGViMmFhOWEiLCJzdWIiOiI3N2Y5YzQxOS1lOWYwLTRkNDgtOGQxZS01ZDBjYmVlMzY4MDEiLCJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImZvbnR5cy5tdXNpeEBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW5pc3RyYXRvciIsImV4cCI6MTY0MjAwMTEzNSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdCIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3QifQ.3JS4iaoesPkBwnM-LyQJx_-11mPRPFF3DKMMsx7X-PE')
  
  const mockRouter = {
    push: jest.fn()
  }
  const wrapper = shallowMount(NavigationBar, {
    global: {
      mocks: {
        $router: mockRouter
      }
    }
  })

  wrapper.vm.handleLogOut()
  await wrapper.vm.$nextTick()
  expect(wrapper.vm.isUserLoggedIn()).toBe(false)
  expect(wrapper.vm.$router.push).toBeCalledWith('/signin')
})