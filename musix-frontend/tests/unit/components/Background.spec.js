import { shallowMount } from '@vue/test-utils'
import Background from '../../../src/components/Background.vue'
import image from '../../../src/assets/background.jpg'

test('Can load background', async () => {
  const wrapper = shallowMount(Background, {
      data() {
        return {
          image: image
        }
      }
    })
  expect(wrapper.find('img').element.style.getPropertyValue('src')).toBe(image)
})
