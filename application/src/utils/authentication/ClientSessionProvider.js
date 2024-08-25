"use client";

import { SessionProvider } from "next-auth/react";


export function ClientSessionProvider({
    children,
    session,
}) {
    return <SessionProvider session={session}>{children}</SessionProvider>;
}