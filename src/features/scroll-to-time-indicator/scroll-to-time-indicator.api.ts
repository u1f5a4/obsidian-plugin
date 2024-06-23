export class ScrollToTimeIndicator {
  private container: string
  private delay?: number
  private interval: NodeJS.Timeout
  private delayInit?: number

  constructor(container: string, delay?: number, delayInit?: number) {
    this.container = container
    this.delay = delay
    this.delayInit = delayInit

    this.init()
  }

  private async init() {
    const element = await this.findIndicator()

    // scroll when init
    setTimeout(() => {
      this.scrollTo(element)
    }, this.delayInit || 0)

    if (this.delay) this.scrollInterval(element)
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
    }, this.delay)
  }

  public destroy() {
    if (this.interval) clearInterval(this.interval)
  }
}
