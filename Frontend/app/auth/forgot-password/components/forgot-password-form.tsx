"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderCircle, Mic } from "lucide-react";
import Link from "next/link";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { authControllerForgotPasswordMutation } from "@/app/client/@tanstack/react-query.gen";
import { toast } from "sonner";
import { getApiErrorMessage } from "@/lib/get-api-error-message";

const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
});

type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const forgotPasswordMutation = useMutation({
    ...authControllerForgotPasswordMutation(),
  });

  const onSubmit = async (data: ForgotPasswordData) => {
    setIsSubmitting(true);
    try {
      await forgotPasswordMutation.mutateAsync({
        body: { email: data.email },
      });
      toast.success("Reset link sent to your email.");
      router.push("/auth/reset-email-sent");
    } catch (error: unknown) {
      setIsSubmitting(false);
      if (
        (error as { error_code?: string })?.error_code === "invalid_credentials"
      ) {
        setError("email", {
          type: "manual",
          message: "Email not found",
        });
      } else {
        const errorMessage = getApiErrorMessage(error);
        toast.error(`Failed to send reset link: ${errorMessage}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Mic className="h-12 w-12 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
          <p className="text-gray-600">
            Enter your email to reset your password
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="text-sm font-medium text-red-500">
                {errors.email.message}
              </p>
            )}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>
          <div className="mt-6 text-center">
            <Link
              href="/auth/login"
              className="text-sm text-blue-600 hover:underline"
            >
              Back to Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
