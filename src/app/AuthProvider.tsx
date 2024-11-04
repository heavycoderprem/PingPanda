"use client";
import {KindeProvider} from "@kinde-oss/kinde-auth-nextjs";
import { ChildContextProvider, PropsWithChildren } from "react";

export const AuthProvider = ({children}: PropsWithChildren) => {
  return <KindeProvider>{children}</KindeProvider>;
};