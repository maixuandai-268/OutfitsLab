"use client";

import { ReactNode } from "react";
import { useAuth } from "@/context/AuthContext";

type Props = {
  children: ReactNode;
};

export default function AuthGate({ children }: Props) {
  const { loading } = useAuth();

  if (loading) return null;

  return <>{children}</>;
}