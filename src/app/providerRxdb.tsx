import Database from "@/app/model/database";
import { useEffect, useState } from "react";
import { Provider } from "rxdb-hooks";

export const ProviderRxdb = ({ children }: { children: React.ReactNode }) => {
  const [db, setDb] = useState();

  useEffect(() => {
    const db = Database.getDatabase();
    if (!db) return;
    return setDb(db);
  }, []);

  return (
    <Provider db={db}>
      {children}
    </Provider>
  );
};
