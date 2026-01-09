import { describe, it, expect, vi } from 'vitest'

import { mount } from '@vue/test-utils'
import App from './App.vue'

vi.mock("@/services/api", () => ({
  fetchGraphData: vi.fn().mockResolvedValue([])
}));
describe('App', () => {
  it('mounts renders properly', () => {
    const wrapper = mount(App)
    expect(wrapper.text()).toContain('')
  })
})
