import { useEffect } from 'react'
import config from '../../config/site.config'

const createFooterMarkup = () => {
  return {
    __html: config.footer,
  }
}

// Umami visit counter widget
const UmamiFooter = () => {
  useEffect(() => {
    const shareId   = 'gjFl1anVRaUpfLZE'
    const websiteId = '20eb017f-1d2d-46c3-8369-ecbe9b53a87b'
    const baseUrl   = 'https://u.xiegao.top'

    function animateValue(obj: HTMLElement, start: number, end: number, duration: number) {
      let startTimestamp: number | null = null
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp
        const progress = Math.min((timestamp - startTimestamp) / duration, 1)
        obj.innerHTML = String(Math.floor(progress * (end - start) + start))
        if (progress < 1) {
          window.requestAnimationFrame(step)
        } else {
          obj.innerHTML = String(end)
        }
      }
      window.requestAnimationFrame(step)
    }

    async function fetchStats() {
      try {
        const tokenRes = await fetch(`${baseUrl}/api/share/${shareId}`)
        if (!tokenRes.ok) return
        const tokenData = await tokenRes.json()
        const token = tokenData.token
        const wid = tokenData.websiteId || websiteId

        const now = Date.now()
        const startOfDay = new Date()
        startOfDay.setHours(0, 0, 0, 0)
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

        const [todayRes, totalRes] = await Promise.all([
          fetch(`${baseUrl}/api/websites/${wid}/stats?startAt=${startOfDay.getTime()}&endAt=${now}&unit=hour&timezone=${encodeURIComponent(timezone)}&compare=false`, {
            headers: { 'x-umami-share-token': token },
          }),
          fetch(`${baseUrl}/api/websites/${wid}/stats?startAt=0&endAt=${now}&unit=hour&timezone=${encodeURIComponent(timezone)}&compare=false`, {
            headers: { 'x-umami-share-token': token },
          }),
        ])

        if (todayRes.ok) {
          const today = await todayRes.json()
          const el = document.getElementById('uv-today')
          if (el) animateValue(el, 0, today.pageviews?.value ?? today.pageviews ?? 0, 800)
        }
        if (totalRes.ok) {
          const total = await totalRes.json()
          const el = document.getElementById('uv-total')
          if (el) animateValue(el, 0, total.pageviews?.value ?? total.pageviews ?? 0, 800)
        }
      } catch (e) {
        console.warn('[umami-footer]', e)
      }
    }

    // Scroll-hide: hides when scrolling down, shows on scroll up
    function initScrollHide() {
      const footer = document.getElementById('umami-footer')
      if (!footer) return

      let lastScrollY = window.scrollY
      let lastTouchY = 0
      let ticking = false

      function onScroll() {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            const el = document.getElementById('umami-footer')
            if (!el) return
            const current = window.scrollY
            if (current > lastScrollY + 4) {
              el.classList.add('hidden')
            } else if (current < lastScrollY - 4) {
              el.classList.remove('hidden')
            }
            lastScrollY = current
            ticking = false
          })
          ticking = true
        }
      }

      function onTouchStart(e: TouchEvent) {
        lastTouchY = e.touches[0].clientY
      }

      function onTouchMove(e: TouchEvent) {
        const el = document.getElementById('umami-footer')
        if (!el) return
        const deltaY = lastTouchY - e.touches[0].clientY
        if (deltaY > 4) el.classList.add('hidden')
        else if (deltaY < -4) el.classList.remove('hidden')
        lastTouchY = e.touches[0].clientY
      }

      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('touchstart', onTouchStart, { passive: true })
      window.addEventListener('touchmove', onTouchMove, { passive: true })
    }

    // Wait for DOM elements to be ready
    let tries = 0
    const timer = setInterval(() => {
      tries++
      if (document.getElementById('uv-today')) {
        clearInterval(timer)
        fetchStats()
        initScrollHide()
      } else if (tries >= 20) {
        clearInterval(timer)
      }
    }, 300)

    return () => clearInterval(timer)
  }, [])

  return (
    <div id="umami-footer">
      <span>今日访问 <b id="uv-today">--</b> 次</span>
      <span>累计访问 <b id="uv-total">--</b> 次</span>
    </div>
  )
}

const Footer = () => {
  return (
    <>
      <div
        className="od-footer w-full border-t border-gray-900/10 p-4 text-center text-xs font-medium text-gray-400 dark:border-gray-500/30"
        dangerouslySetInnerHTML={createFooterMarkup()}
      />
      <UmamiFooter />
    </>
  )
}

export default Footer
