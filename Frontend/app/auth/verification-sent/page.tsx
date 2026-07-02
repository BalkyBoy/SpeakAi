"use client";
import { useAuthStore } from "@/store/use-auth-store";
import { useResendEmailCooldown } from "../verify-email/hooks/use-resend-email-cooldown";
import { Card, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Page = () => {
  const { auth } = useAuthStore();
  const {
    handleResendEmail,
    isDisabled,
    isLoading,
    cooldownTime,
    isOnCooldown,
  } = useResendEmailCooldown();
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to bg-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="mb-14 rounded-2xl">
          <CardContent className="p-8">
            <div className="mb-4 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
                <Mail className="h-8 w-8 text-blue-700" />
              </div>
              <h1 className="mb-2 text-2xl font-bold text-center">
                Please verify your
              </h1>
              <p className="text-sm text-gray-600">
                A verification email has been sent to{" "}
                <span className="font-semibold">{auth?.email}</span>. <br />
                Please check your inbox and click the verification link.
              </p>
            </div>
            <div className="space-y-4">
              <Button
                onClick={handleResendEmail}
                disabled={isDisabled}
                className="mt-2 mb-2 w-full rounded-md py-6 text-center disabled:opacity-50"
              >
                {isLoading
                  ? "Sending..."
                  : isOnCooldown
                    ? `Resend email (${cooldownTime}s)`
                    : `Resend email`}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default Page;
