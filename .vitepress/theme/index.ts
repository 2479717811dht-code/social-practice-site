import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import MotionSection from './components/MotionSection.vue'
import './style.css'

export default {
  extends: DefaultTheme,

  enhanceApp({ app }) {
    app.component('MotionSection', MotionSection)
  }
} satisfies Theme