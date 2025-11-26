'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type SessionData = {
  userId: string | null;
  dynamicPass: string | null;
  bossId: string | null;
  gameAddress: string | null;
};

type SessionContextType = {
  sessionData: SessionData;
  setSessionData: React.Dispatch<React.SetStateAction<SessionData>>;
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [sessionData, setSessionData] = useState<SessionData>({
    userId: null,
    dynamicPass: null,
    bossId: null,
    gameAddress: null,
  });

  return (
    <SessionContext.Provider value={{ sessionData, setSessionData }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};
