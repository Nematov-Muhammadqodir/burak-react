import React, { ReactNode, useState } from "react";
import Cookies from "universal-cookie";
import { Member } from "../../lib/types/member";
import { GlobalContext } from "../hooks/useGlobals";

const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const cookie = new Cookies();

  if (!cookie.get("accessToken")) localStorage.removeItem("memberData");

  const [authMember, setAuthMember] = useState<Member | null>(
    localStorage.getItem("memberData")
      ? JSON.parse(localStorage.getItem("memberData") as string)
      : null
  );

  return (
    <GlobalContext.Provider value={{ authMember, setAuthMember }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default ContextProvider;
