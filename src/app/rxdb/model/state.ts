type State = {
  isFirstLaunch: boolean
}

class StateDB {
  private myDatabase: any

  constructor(database: any) {
    this.myDatabase = database
  }

  async init() {
    const defaultState: State = { isFirstLaunch: true }

    try {
      await this.myDatabase.insertLocal("state", defaultState)
    } catch (error) {
    }

    return this
  }

  async get(key: keyof State) {
    return (await this.myDatabase.getLocal("state")).toJSON().data?.[key]
  }

  async set(key: string, value: any) {
    const currentState = (await this.myDatabase.getLocal("state")).toJSON().data
    return await this.myDatabase.upsertLocal("state", { ...currentState, [key]: value })
  }
}

export { StateDB }
