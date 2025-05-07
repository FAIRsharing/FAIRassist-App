import { describe, it, expect } from 'vitest';
import { createVuetify } from 'vuetify';
import VueParticles from "@tsparticles/vue3";


import { mount } from '@vue/test-utils'
import PageHeader from '../PageHeader.vue'

const vuetify = createVuetify();

describe('HelloWorld', () => {
  it('renders properly', async () => {
    const wrapper = await mount(PageHeader, {
      global: {
        plugins: [vuetify],
        components: {
          "vue-particles": VueParticles
        }
      },
      props: {
        pageHeaderData: {
          pageName: "PageFooter",
          title: "Head",
          subTitle: "Some stuff",
          tempSubTitle: "More stuff!"
        }
      }
    })
    expect(wrapper.vm.$options.name).toEqual('PageHeader')
  })
})
