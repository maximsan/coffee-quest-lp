import { useEffect, useState } from 'react'

export function useParallax(multiplier = 0.12) {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    let frameId = 0

    const update = () => {
      frameId = 0
      setOffset(window.scrollY * multiplier)
    }

    const handleScroll = () => {
      if (frameId) {
        return
      }

      frameId = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (frameId) {
        window.cancelAnimationFrame(frameId)
      }
    }
  }, [multiplier])

  return offset
}
