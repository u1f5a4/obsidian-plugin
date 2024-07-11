export class ScrollToTimeIndicator {
  private container: string
  private delayMinutes: number
  private interval: NodeJS.Timeout
  private delayInit?: number

  constructor(container: string, delayMinutes: number, delayInit?: number) {
    this.container = container
    this.delayMinutes = this.convertMinutesToMs(delayMinutes)
    this.delayInit = delayInit

    this.init()
  }

  private async init() {
    const element = await this.findIndicator()

    // scroll when init
    setTimeout(() => {
      this.scrollTo(element)
      this.scrollInterval(element)
    }, this.delayInit || 0)
  }

  private async findIndicator() {
    return new Promise<Element>((resolve) => {
      const findInteraval = setInterval(() => {
        const findElement = document.querySelector(`.${this.container} .sx__current-time-indicator`)

        if (findElement) {
          resolve(findElement)
          clearInterval(findInteraval)
        }
      }, 100)
    })
  }

  private scrollTo(element: Element) {
    element.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" })
  }

  private async scrollInterval(element: Element) {
    this.interval = setInterval(() => {
      this.scrollTo(element)
    }, this.delayMinutes)
  }

  public destroy() {
    if (this.interval) clearInterval(this.interval)
  }

  private convertMinutesToMs(ms: number) {
    return ms * 1000 * 60
  }
}
