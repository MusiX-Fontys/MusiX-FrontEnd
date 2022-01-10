import { shallowMount } from '@vue/test-utils'
import Navigationbar from '../../src/components/Navigationbar.vue'
import Background from '../../src/components/Background.vue'
import App from '../../src/App.vue'
import router from '../../src/router/index'

test('Do all component\'s render correctly', async () => {
  router.push('/signin')
  await router.isReady()
  const wrapper = shallowMount(App, {
    global: {
      plugins: [router]
    }
  })

  expect(wrapper.findComponent(Navigationbar).exists()).toBe(true)
  expect(wrapper.findComponent(Background).exists()).toBe(true)
})

test('Is it able to determine SignInPage', async () => {
  router.push('/signin')
  await router.isReady()
  const wrapper = shallowMount(App, {
    global: {
      plugins: [router]
    }
  })
  expect(wrapper.vm.isNotSignInOrSignUpPage()).toBe(false)
})

test('Is it able to determine HomePage', async () => {
  router.push('/')
  await router.isReady()
  const wrapper = shallowMount(App, {
    global: {
      plugins: [router],
      mocks: {
        $route: '/'
      }
    }
  })
  expect(wrapper.vm.isNotSignInOrSignUpPage()).toBe(true)
})
