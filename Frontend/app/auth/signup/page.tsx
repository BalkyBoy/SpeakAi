"use client"
import React from "react"
import {  useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mic, Eye, EyeOff, Mail, Lock, User, AlertCircle, Loader2 } from "lucide-react"
import Link from "next/link";
import * as z from "zod"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { authControllerRegisterMutation } from "@/client/@tanstack/react-query.gen"
import {Controller, useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from "@/app/providers/auth-provider"




const signUpSchema = z
  .object({
    firstName: z
      .string()
      .max(15, 'First name must be at most 15 characters')
      .min(1, 'First name is required')
      .transform((val) => val.trim())
      .refine(
        (val) => val.length > 0,
        'First name cannot be empty after trimming'
      )
      .refine(
        (val) => /^[a-zA-Z]+$/.test(val),
        'Only letters allowed, no spaces'
      ),
    lastName: z
      .string()
      .max(15, 'Last name must be at most 15 characters')
      .min(1, 'Last name is required')
      .transform((val) => val.trim())
      .refine(
        (val) => val.length > 0,
        'Last name cannot be empty after trimming'
      )
      .refine(
        (val) => /^[a-zA-Z]+$/.test(val),
        'Only letters allowed, no spaces'
      ),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Invalid email')
      .transform((val) => val.toLowerCase()),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(128, 'Password must be at most 128 characters')
      .regex(/^\S*$/, 'No spaces allowed in password')
      .regex(/[A-Z]/, 'Must include at least one uppercase letter')
      .regex(/[a-z]/, 'Must include at least one lowercase letter')
      .regex(/[0-9]/, 'Must include at least one number'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    nativeLanguage: z.string().min(1, 'Native language is required'),
    learningLanguage: z.string().min(1, 'Learning language is required')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
  ;

type SignUpData = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const { user, setUser, logout } = useAuth()
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

type RegisterResponse = {
  user: {
    id: string
    email: string
    firstName: string
    lastName: string
    nativeLanguage: string
    learningLanguage: string
  }
  token: string
}

  const registerUser = useMutation({
    ...authControllerRegisterMutation()
  });

  const {
    register,
    handleSubmit,
    formState: {errors},
    control,
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      nativeLanguage: "",
      learningLanguage: "",
    }
  })

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    nativeLanguage: "",
    learningLanguage: "",
  })
  
  const languages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Italian",
    "Portuguese",
    "Chinese (Mandarin)",
    "Japanese",
    "Korean",
    "Arabic",
    "Russian",
    "Hindi",
  ]

  const onSubmit = async (data: SignUpData) => {
    setIsSubmitting(true);

    if (!agreeToTerms) {
      setError("You must agree to the terms and conditions")
      return
    }

    try {
      const response = await registerUser.mutateAsync({
        body: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        nativeLanguage: data.nativeLanguage,
        learningLanguage: data.learningLanguage,
        }
      }) as RegisterResponse;

      if (response.user) {
        setUser(response.user);
      }
      if (response.token) {
        localStorage.setItem("authToken", response.token);
      }

      router.push("/auth/verification-sent");
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || "An error occurred during registration";
      setError(errorMessage);
  }
}

  const handleSocialSignUp = (provider: "google" | "apple") => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/${provider}`;
  }


  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100  items-center justify-center p-4 flex">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        <div className="flex justify-center lg:justify-end">
        <Card className="shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign up</CardTitle>
            <CardDescription className="text-center">Create your account to get started with SpeakAI</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Error Alert */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Sign Up Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    disabled={isSubmitting}
                    {...register("firstName")}
                  />
                </div>
                {errors.firstName && (
                  <p className="text-sm text-red-600">{errors.firstName.message}</p>
                )}
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    disabled={isSubmitting}
                    {...register("lastName")}
                  />
                </div>
                {errors.lastName && (
                  <p className="text-sm text-red-600">{errors.lastName.message}</p>
                )}
              </div>
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="pl-10"
                    required
                    disabled={isSubmitting}
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              {/* Language Selection */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nativeLanguage">Native Language</Label>
                  <Controller
                    name="nativeLanguage"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={isSubmitting}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          {languages.map((language) => (
                            <SelectItem key={language} value={language}>
                              {language}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.nativeLanguage && (
                    <p className="text-sm text-red-600">{errors.nativeLanguage.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="learningLanguage">Learning Language</Label>
                  <Controller
                    name="learningLanguage"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={isSubmitting}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          {languages.map((language) => (
                            <SelectItem key={language} value={language}>
                              {language}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.learningLanguage && (
                    <p className="text-sm text-red-600">{errors.learningLanguage.message}</p>
                  )}
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    className="pl-10 pr-10"
                    disabled={isSubmitting}
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    disabled={isSubmitting}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="pl-10 pr-10"
                    disabled={isSubmitting}
                    {...register("confirmPassword")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Terms Agreement */}
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreeToTerms}
                  onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                  disabled={isSubmitting}
                  className="mt-1"
                />
                <Label htmlFor="terms" className="text-sm font-normal leading-5">
                  I agree to the{" "}
                  <Link href="/terms" className="text-blue-600 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting || !agreeToTerms}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create account"
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Social Sign Up */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                onClick={() => handleSocialSignUp("google")}
                disabled={isLoading}
                className="w-full"
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSocialSignUp("apple")}
                disabled={isLoading}
                className="w-full"
              >
                <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C8.396 0 8.025.044 6.79.207 5.557.37 4.697.594 3.953.89c-.744.296-1.376.69-2.005 1.318C1.32 2.837.926 3.47.63 4.213.334 4.957.11 5.817-.053 7.05-.216 8.284-.26 8.655-.26 12.276c0 3.621.044 3.992.207 5.225.163 1.233.387 2.093.683 2.837.296.744.69 1.376 1.318 2.005.629.629 1.261 1.022 2.005 1.318.744.296 1.604.52 2.837.683 1.233.163 1.604.207 5.225.207 3.621 0 3.992-.044 5.225-.207 1.233-.163 2.093-.387 2.837-.683.744-.296 1.376-.69 2.005-1.318.629-.629 1.022-1.261 1.318-2.005.296-.744.52-1.604.683-2.837.163-1.233.207-1.604.207-5.225 0-3.621-.044-3.992-.207-5.225-.163-1.233-.387-2.093-.683-2.837-.296-.744-.69-1.376-1.318-2.005C20.543 1.32 19.911.926 19.168.63 18.424.334 17.564.11 16.331-.053 15.098-.216 14.727-.26 11.106-.26h.911zm-3.446 2.209v.001c.795.002 1.323.009 2.146.023l.255.004.23.003c3.41 0 3.814.019 4.957.171 1.133.149 1.905.415 2.307.563.436.239.747.477.747.477.477.477.477.477.477.477.148.402.414 1.174.563 2.307.152 1.143.171 1.547.171 4.957 0 3.41-.019 3.814-.171 4.957-.149 1.133-.415 1.905-.563 2.307-.239.436-.477.747-.477.747-.477.477-.477.477-.477.477-.402.148-1.174.414-2.307.563-1.143.152-1.547.171-4.957.171-3.41 0-3.814-.019-4.957-.171-1.133-.149-1.905-.415-2.307-.563-.436-.239-.747-.477-.747-.477-.477-.477-.477-.477-.477-.477-.148-.402-.414-1.174-.563-2.307-.152-1.143-.171-1.547-.171-4.957 0-3.41.019-3.814.171-4.957.149-1.133.415-1.905.563-2.307.239-.436.477-.747.477-.747.477-.477.477-.477.477-.477.402-.148 1.174-.414 2.307-.563.996-.113 1.382-.145 2.146-.161zm4.12 1.696a1.32 1.32 0 1 0 0 2.64 1.32 1.32 0 0 0 0-2.64zm-2.209 1.84a6.072 6.072 0 1 0 0 12.144 6.072 6.072 0 0 0 0-12.144zm0 2.163a3.909 3.909 0 1 1 0 7.818 3.909 3.909 0 0 1 0-7.818z" />
                </svg>
                Apple
              </Button>
            </div>

            {/* Sign In Link */}
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/signin" className="text-blue-600 hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
        </div>
         <div className="text-center mb-8 hidden lg:block space-y-6 lg:pl-8">
          <Link href="/" className="inline-flex items-center mb-6">
            <Mic className="h-10 w-10 text-blue-600 mr-3" />
            <span className="text-3xl font-bold text-gray-900">SpeakAI</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Create your account</h1>
          <p className="text-gray-600">Start your pronunciation training journey today</p>
          <div className="text-center mt-8">
          <p className="text-xs text-gray-500">
            By creating an account, you agree to our{" "}
            <Link href="/terms" className="hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
        </div>    
      </div>
    </div>
  )
}
