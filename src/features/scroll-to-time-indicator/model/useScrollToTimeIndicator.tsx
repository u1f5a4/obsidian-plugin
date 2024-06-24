import { useEffect } from "react"

import { ScrollToTimeIndicator } from "./ScrollToTimeIndicator"

type useScrollToTimeIndicatorProps = {
  /** class of container */
  container: string
  /** delay in minutes */
  delayMinutes: number
  /** delay before scroll when init */
  delayInit?: number
}

export const useScrollToTimeIndicator = ({ container, delayMinutes, delayInit }: useScrollToTimeIndicatorProps) => {
  useEffect(() => {
    const scrollToTimeIndicator = new ScrollToTimeIndicator(container, delayMinutes, delayInit)

    return () => {
      scrollToTimeIndicator.destroy()
    }
  }, [])
}
