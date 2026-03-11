"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/auth" })}
      style={{ marginTop: 12 }}
    >
      Logout
    </button>
  );
}
