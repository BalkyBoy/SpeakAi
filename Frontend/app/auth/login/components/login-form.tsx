"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderCircle, Mic, TrainTrack } from "lucide-react";
import Link from "next/link";
import z, { email } from "zod";
import { useAuthStore } from "@/store/use-auth-store";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { authControllerLoginMutation } from "@/app/client/@tanstack/react-query.gen";
import { getApiErrorMessage } from "@/lib/get-api-error-message";
import { toast } from "sonner";

const signInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type SignInData = z.infer<typeof signInSchema>;

export default function LoginForm() {
  const { setAuth } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
  });
  const login = useMutation({
    ...authControllerLoginMutation(),
  });
  const onSubmit = async (data: SignInData) => {
    setIsSubmitting(true);
    try {
      const res = await login.mutateAsync({
        body: data,
      });
      interface LoginResponse {
        data?: {
          user?: {
            email: string;
            id: string;
            firstName?: string;
            lastName?: string;
            isEmailVerified: boolean;
            createdAt: string;
            nativeLanguage: string;
            learningLanguage: string;
          };
          accessToken: string;
        };
        user?: {
          email: string;
          id: string;
          firstName?: string;
          lastName?: string;
          isEmailVerified: boolean;
          createdAt: string;
          nativeLanguage: string;
          learningLanguage: string;
        };
        accessToken: string;
      }
      const response = res as LoginResponse;
      const userData = response?.data || response;

      if (userData?.user?.isEmailVerified === false) {
        setAuth({
          email: data.email,
          id: userData?.user?.id,
          isEmailVerified: false,
          createdAt: userData?.user.createdAt,
          token: userData.accessToken,
          firstName: userData?.user?.firstName || "",
          lastName: userData?.user?.lastName || "",
          nativeLanguage: userData?.user?.nativeLanguage || "",
          learningLanguage: userData?.user?.learningLanguage || "",
        });
        router.push("/auth/verify-email");
        setIsSubmitting(false);
        return;
      }

      const authData = {
        email: userData?.user?.email || data.email,
        id: userData?.user?.id,
        isEmailVerified: userData?.user?.isEmailVerified,
        token: userData.accessToken,
        firstName: userData?.user?.firstName,
        lastName: userData?.user?.lastName,
        nativeLanguage: userData?.user?.nativeLanguage,
        learningLanguage: userData?.user?.learningLanguage,
        createdAt: userData?.user?.createdAt || null,
      };
      setAuth(authData);

      const { client } = await import("@/app/client/client.gen");
      client.setConfig({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
        credentials: "include",
        headers: {
          Authorization: `Bearer ${userData.accessToken}`,
        },
      });
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Login error:", error);
      if (error.response?.data?.message === "Invalid credentials") {
        setError("root", { message: "Invalid email or password" });
      } else {
        setError("root", { message: "An error occurred during login" });
      }
      setIsSubmitting(false);
      const err = getApiErrorMessage(error);
      if (
        err.toLowerCase().includes("verify") ||
        err.toLowerCase().includes("verification") ||
        err.toLowerCase().includes("not verified")
      ) {
        setAuth({
          email: data.email,
          id: null,
          isEmailVerified: false,
          createdAt: null,
          token: "",
        });
        router.push("/auth/verify-email");
        return;
      }
      toast.error(err);
      setError("email", { message: err });
    }
  };
  return (
    <div>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Mic className="h-12 w-12 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <p className="text-gray-600">Sign in to your SpeakAI account</p>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email")}
                suppressHydrationWarning
              />
            </div>
            {errors.root && (
              <p className="text-sm font-medium text-red-500">
                {errors.root.message}
              </p>
            )}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password")}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Log In"
              )}
            </Button>
          </form>
          <div className="mt-6 text-center space-y-2">
            <Link
              href="/auth/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot your password?
            </Link>
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                href="/auth/signup"
                className="text-blue-600 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
