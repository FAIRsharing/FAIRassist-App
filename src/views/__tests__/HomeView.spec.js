import { describe, it, expect } from 'vitest'
import { createVuetify } from 'vuetify';
import VueParticles from "@tsparticles/vue3";

import { mount } from '@vue/test-utils'
import HomeView from '../HomeView.vue'

const vuetify = createVuetify();

describe('HomeView', () => {
  it('renders properly', () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [vuetify],
        components: {
          "vue-particles": VueParticles
        }
      }
    })
    expect(wrapper.vm.$options.name).toEqual('HomeView')
  })
})
