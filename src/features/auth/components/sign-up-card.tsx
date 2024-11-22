"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardHeader, CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useSignUp } from "@/features/auth/hooks/use-sign-up";
import { TriangleAlert } from "lucide-react";

export const SignUpCard = () => {
  const mutation = useSignUp();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onProviderSignUp = (provider: "github" | "google") => {
    signIn(provider, { redirectTo: "/" });
  };

  const onCredentialsSignup = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutation.mutate({
      name,
      email,
      password,
      },
      {
        onSuccess: () => {
          signIn("credentials", { email, password, redirectTo: "/" });
        },
      }
    );
  };

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Create an account</CardTitle>
        <CardDescription>Use your email or another service to continue</CardDescription>
      </CardHeader>
      {
        !!mutation.error && <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
            <TriangleAlert className="size-4 text-destructive"/>
            <p className="text-sm text-destructive">Something went wrong</p>
        </div>
      }
      <CardContent className="space-y-5 px-0 pb-0">
        <form onSubmit={onCredentialsSignup} className="space-y-2.5">
          <Input disabled={mutation.isPending} type="text" placeholder="Full name" required value={name} onChange={(e) => setName(e.target.value)} />
          <Input disabled={mutation.isPending} type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input disabled={mutation.isPending} type="password" placeholder="Password" required minLength={3} maxLength={20} value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button disabled={mutation.isPending} type="submit" className="w-full" size="lg">Continue</Button>
        </form>
        <Separator />
        <div className="flex flex-col gap-y-2.5">
          <Button disabled={mutation.isPending} onClick={() => onProviderSignUp("google")} className="w-full relative" variant="outline" size="lg">
            <FcGoogle className="absolute mr-2 size-5 top-2.5 left-2.5" />
            Continue with Google
          </Button>
          <Button disabled={mutation.isPending} onClick={() => onProviderSignUp("github")} className="w-full relative" variant="outline" size="lg">
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
