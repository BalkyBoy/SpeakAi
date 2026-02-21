"use client";

import { useAuthStore } from "@/store/use-auth-store";
import { useSearchParams } from "next/navigation";

type VerificationState = "loading" | "success" | "error";

export function Screen() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { auth } = useAuthStore();
  const { isLoading: isResending, resendVerificationEmail } = useResendEmail();
}
