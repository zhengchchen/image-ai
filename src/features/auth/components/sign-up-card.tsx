"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardHeader, CardContent, CardDescription } from "@/components/ui/card";

export const SignUpCard = () => {
  const onProviderSignUp = (provider: "github" | "google") => {
    signIn(provider, { redirectTo: "/" });
  };

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Create an account</CardTitle>
        <CardDescription>Use your email or another service to login</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 px-0 pb-0">
        <div className="flex flex-col gap-y-2.5">
          <Button onClick={() => onProviderSignUp("google")} className="w-full relative" variant="outline" size="lg">
            <FcGoogle className="absolute mr-2 size-5 top-2.5 left-2.5" />
            Continue with Google
          </Button>
          <Button onClick={() => onProviderSignUp("github")} className="w-full relative" variant="outline" size="lg">
            <FaGithub className="absolute mr-2 size-5 top-2.5 left-2.5" />
            Continue with Github
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Already have an account?{" "}
          <Link href="/sign-in">
            <span className="text-sky-700 hover:underline">Sign in</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};
