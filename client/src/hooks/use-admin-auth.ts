"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AdminUser {
  name: string;
  email: string;
}

export function useAdminAuth() {
  const router = useRouter();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("admin_token");
    const userStr = sessionStorage.getItem("admin_user");

    if (!token) {
      router.replace("/admin-tools/login");
      return;
    }

    try {
      setUser(userStr ? JSON.parse(userStr) : null);
    } catch {
      setUser(null);
    }
    setChecking(false);
  }, [router]);

  const logout = () => {
    sessionStorage.removeItem("admin_token");
    sessionStorage.removeItem("admin_user");
    router.replace("/admin-tools/login");
  };

  return { user, checking, logout };
}
