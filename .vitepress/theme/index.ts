import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import MotionSection from './components/MotionSection.vue'
import './style.css'

export default {
  extends: DefaultTheme,

  enhanceApp({ app, router }) {
    app.component('MotionSection', MotionSection)

    if (typeof window === 'undefined') return

    const enableHeroTilt = () => {
  document.addEventListener('pointermove', (event) => {
    const target = event.target as HTMLElement
    const card = target.closest<HTMLElement>(
      '.VPHomeHero .image-container'
    )

    if (!card) return

    const rect = card.getBoundingClientRect()

    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height

    const rotateY = (x - 0.5) * 14
    const rotateX = (0.5 - y) * 14

    card.style.setProperty('--shine-x', `${x * 100}%`)
    card.style.setProperty('--shine-y', `${y * 100}%`)

    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.025)
    `

    card.classList.add('is-tilting')
  })

  document.addEventListener('pointerout', (event) => {
    const target = event.target as HTMLElement
    const card = target.closest<HTMLElement>(
      '.VPHomeHero .image-container'
    )

    if (!card) return

    const next = event.relatedTarget as Node | null

    if (next && card.contains(next)) return

    card.style.transform = ''
    card.classList.remove('is-tilting')
  })
}

enableHeroTilt()

    let observer: IntersectionObserver | undefined

    const runEffects = () => {
      observer?.disconnect()

      const pageRoot =
        document.querySelector<HTMLElement>('.VPDoc')

      if (!pageRoot) return

      // 每次进入新页面，重新触发整体淡入
      pageRoot.classList.remove('vp-route-enter')
      void pageRoot.offsetWidth
      pageRoot.classList.add('vp-route-enter')

      // 系统要求减少动画时，不执行滚动显现
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return
      }

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return

            entry.target.classList.add('is-revealed')
            observer?.unobserve(entry.target)
          })
        },
        {
          threshold: 0.12,
          rootMargin: '0px 0px -6% 0px'
        }
      )

      const selector = '.VPDoc .content > *'

      const targets = Array.from(
        document.querySelectorAll<HTMLElement>(selector)
      )

      targets.forEach((element, index) => {
        element.classList.remove('scroll-reveal', 'is-revealed')

        // 同一批内容有轻微错落感，不会一起硬出现
        element.style.setProperty(
          '--reveal-delay',
          `${Math.min((index % 4) * 70, 210)}ms`
        )

        element.classList.add('scroll-reveal')
        observer?.observe(element)
      })
    }

    const scheduleEffects = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(runEffects)
      })
    }

    const previousAfterRouteChange = router.onAfterRouteChange

    router.onAfterRouteChange = async (to) => {
      await previousAfterRouteChange?.(to)
      scheduleEffects()
    }

    if (document.readyState === 'loading') {
      window.addEventListener('DOMContentLoaded', scheduleEffects, {
        once: true
      })
    } else {
      scheduleEffects()
    }
  }
} satisfies Theme