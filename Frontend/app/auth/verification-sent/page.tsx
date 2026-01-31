"use client"

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Mic, Mail, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function VerificationSent() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleOtpChange = (value: string, index: number) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleResendOtp = () => {
    setTimer(30);
    // Add API call to resend OTP
  };

  const handleVerifyOtp = () => {
    const enteredOtp = otp.join('');
    console.log('Verifying OTP:', enteredOtp);
    // Add API call to verify OTP
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Mail className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Check Your Email</CardTitle>
          <p className="text-gray-600">
            We've sent a verification link to your email address
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Please check your email and click the verification link to activate your account.
            </p>
          </div>

          <div className="space-y-4">
            <Button 
              onClick={handleResendOtp}
              disabled={timer > 0}
              variant="outline"
              className="w-full"
            >
              {timer > 0 ? `Resend Email (${timer}s)` : 'Resend Email'}
            </Button>

            <div className="text-center">
              <Link href="/auth/login" className="text-blue-600 hover:underline text-sm">
                Back to Sign In
              </Link>
            </div>
          </div>

          <div className="text-center">
            <Link href="/" className="inline-flex items-center text-blue-600 hover:underline">
              <Mic className="h-4 w-4 mr-1" />
              Back to SpeakAI
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}