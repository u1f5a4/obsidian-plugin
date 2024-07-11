import { useEffect, useState } from "react"
import { Provider } from "rxdb-hooks"

import { database } from ".."

export const ProviderDB = ({ children }: { children: React.ReactNode }) => {
  const [db, setDb] = useState()

  useEffect(() => {
    const db = database.getDatabase()
    if (!db) return
    return setDb(db)
  }, [])

  return (
    <Provider db={db}>
      {children}
    </Provider>
  )
}
