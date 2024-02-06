import { PropsWithChildren, useState, createContext, useSyncExternalStore, useEffect } from "react";
import { Session } from "../models/Session";
import { subscribe, getSnapshot } from "../util/session-vault";
export const SessionContext = createContext<Session | null>(null);

export const SessionProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const session = useSyncExternalStore(subscribe, getSnapshot)

  return (
    <SessionContext.Provider value={session}>
      { children }
    </SessionContext.Provider>
  )
}