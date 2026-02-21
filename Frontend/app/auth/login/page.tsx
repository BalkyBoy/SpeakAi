import { Card, CardContent } from "@/components/ui/card";
import React from "react";
import LoginForm from "./components/login-form";

const page = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-200 px-6 py-12">
      <div className="w-full max-w-lg">
        <Card className="rounded-2xl">
          <CardContent className="p-8">
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default page;
