"use client";

import { useAuthStore } from "@/store/use-auth-store";
import { useSearchParams } from "next/navigation";
import { useResendEmail } from "./hooks/use-resend-email";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { authControllerVerifyEmailMutation } from "@/app/client/@tanstack/react-query.gen";
import { getApiErrorMessage } from "@/lib/get-api-error-message";

import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { VerificationContent } from "./components/verification-content";

type VerificationState = "loading" | "success" | "error";

export function Screen() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { auth } = useAuthStore();
  const { isLoading: isResending, resendVerificationEmail } = useResendEmail();
  const [verificationState, setVerificationState] = useState<VerificationState>('loading');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const  verifyEmailMutation = useMutation({
    ...authControllerVerifyEmailMutation()
  });
  useEffect(() => {
    const verify = async () => {
        if (!token) {
            setErrorMessage(
                'Please verify your email to continue. Click resend to get new verification email'
            );
            setVerificationState('error');
            return;
        }

        try {
            setVerificationState('loading');
            await verifyEmailMutation.mutateAsync({
                body: {token},
            });
            setVerificationState('success');
        } catch (error) {
            console.error('Verification error:', error);
            const errorMsg = getApiErrorMessage(error);
            setErrorMessage(errorMsg);
            setVerificationState('error');
            toast.error(errorMsg)
        }
    };
    verify();
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-md">
            <Card className="mb-14 rounded-2xl border-blue-200">
                <CardContent className="p-8">
                    <VerificationContent
                    state={verificationState}
                    error={errorMessage}
                    email={auth?.email}
                    onResendEmail={resendVerificationEmail}
                    isResending={isResending}
                    />
                </CardContent>
            </Card>
        </div>
    </div>
    
  )
}
