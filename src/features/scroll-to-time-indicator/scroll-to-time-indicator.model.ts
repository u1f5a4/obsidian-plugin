import { useEffect } from "react"

import { ScrollToTimeIndicator } from "./scroll-to-time-indicator.api"

export const useScrollToTimeIndicator = (containerClass: string, delayMinutes?: number, delayInit?: number) => {
  useEffect(() => {
    const delay = delayMinutes ? delayMinutes * 60 * 1000 : undefined
    const scrollToTimeIndicator = new ScrollToTimeIndicator(containerClass, delay, delayInit)

    return () => {
      scrollToTimeIndicator.destroy()
    }
  }, [])
}
