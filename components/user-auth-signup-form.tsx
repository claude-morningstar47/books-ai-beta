"use client";

import * as React from "react";

import { cn, getMessageFromCode } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";
import { useFormState, useFormStatus } from "react-dom";
import { handleGithubSignin, signup } from "@/app/auth/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
// import { handleGithubSignin } from "@/app/auth/login/action";

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

export function UserAuthSignupForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter();
  const { pending } = useFormStatus();
  const [result, dispatch] = useFormState(signup, undefined);

  React.useEffect(() => {
    if (result) {
      if (result.type === "error") {
        toast.error(getMessageFromCode(result.resultCode));
      } else {
        toast.success(getMessageFromCode(result.resultCode));
        router.refresh();
      }
    }
  });

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form action={dispatch}>
        <div className="grid gap-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label className="sr-only" htmlFor="first-name">
                First name
              </Label>
              <Input
                id="first-name"
                name="first-name"
                placeholder="Max"
                autoCapitalize="none"
                autoComplete="first-name"
                autoCorrect="off"
                disabled={pending}
              />
            </div>
            <div className="grid gap-2">
              <Label className="sr-only" htmlFor="last-name">
                Last name
              </Label>
              <Input
                id="last-name"
                name="last-name"
                placeholder="Robinson"
                autoCapitalize="none"
                autoComplete="last-name"
                autoCorrect="off"
                disabled={pending}
              />
            </div>
          </div>

          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              name="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={pending}
            />
          </div>

          <div className="grid gap-2">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={pending}
            />
          </div>

          <Button disabled={pending}>
            {pending ? (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Sign In with Email"
            )}
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        onClick={() => handleGithubSignin()}
        type="button"
        disabled={pending}
      >
        {pending ? (
          <Loader className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        GitHub
      </Button>
    </div>
  );
}
