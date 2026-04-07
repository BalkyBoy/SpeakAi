import React from 'react';
import { Card, CardContent } from '../../../components/ui/card';
import ForgotPasswordForm from './components/forgot-password-form';

const page = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5F5FF] px-6 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border-[#DBDCEA]">
          <div className="p-8">
            <ForgotPasswordForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
