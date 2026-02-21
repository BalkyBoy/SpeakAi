'use client'
import { Button } from "@/components/ui/button"
import { Check, Loader2Icon, LoaderCircle } from "lucide-react";
import Link from "next/link";


type VerificationState = 'loading' | 'success' | 'error';

interface VerificationContentProps {
    state: VerificationState;
    error?: string;
    email: string;
    onResendEmail: () => void;
    isResending: boolean;    
}

export const VerificationContent = ({
    state,
    error,
    email,
    onResendEmail,
    isResending
}: VerificationContentProps) => {
    if (state === 'loading') {
        return (
            <div className="mb-4 text-center">
                <div className="mx-auto mb-4 h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                    <LoaderCircle className="h-8 w-8 animate-spin text-blue-600"/>
                </div>
                <h1 className="text-sm text-black">
                    Verifying Email
                </h1>
                <p className="text-sm text-muted-foreground">
                    Please wait while we verify your email address.
                </p>
            </div>
        )
    }

    const isError = state === 'error';
    const title = `Email verification ${isError ? 'failed' : 'successful'}`;

    return (
        <div className="mb-4 text-center">
            <div className={`mx-auto mb-4 flex h-16 items-center justify-center rounded-full ${isError ? 'bg-red-100' : 'bg-green-100'}`}>
                {isError ? (
                    <span className="text-red-600 text-2xl">!</span>
                ) : (
                    <Check className="h-8 w-8 text-green-600"/>
                )}
            </div>
            <h1 className="text-xl font-semibold text-black">
                {title}
            </h1>
            {isError ? (
                <p className="text-sm text-black">{error || 'An error occured'}</p>
            ):(
                <p className="text-sm text-black">
                    Congratulations! Your email account{''}
                    <span className="font-semibold text-indigo-200">{email}</span> has been verified
                </p>
            )}
            <div className="mt-6">
              {isError ? (
                <Button 
                onClick={onResendEmail}
                disabled={isResending}
                >
                    {isResending ? (
                        <>
                            <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                            Resending...
                        </>
                    ): (
                        'Resend Verification Email'
                    )}
                </Button>
            ) : (
               <Link href="/auth/login">
                 <Button disabled>
                    Email Verified
                    <span>Proceed to Login</span>
                </Button>
               </Link>
            )}
            </div>
        </div>
        
    )
}