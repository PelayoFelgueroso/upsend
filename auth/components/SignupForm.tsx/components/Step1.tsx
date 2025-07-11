"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignupSchemaType } from "@/auth/schemas/signup.schema";
import { Control } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface Props {
  control: Control<SignupSchemaType>;
}

export const Step1 = ({ control }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  return (
    <>
      <FormField
        control={control}
        name="password"
        render={({ field }) => (
          <FormItem className="grid gap-3">
            <FormLabel>Password</FormLabel>
            <div className="relative">
              <FormControl>
                <Input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  {...field}
                  autoComplete="new-password"
                  placeholder="**********"
                />
              </FormControl>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                <span className="sr-only">
                  {showPassword ? "Hide password" : "Show password"}
                </span>
              </Button>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="confirmPassword"
        render={({ field }) => (
          <FormItem className="grid gap-3">
            <FormLabel>Confirm Password</FormLabel>
            <div className="relative">
              <FormControl>
                <Input
                  id="signup-confirm-password"
                  type={showPassword ? "text" : "password"}
                  {...field}
                  autoComplete="new-password"
                  placeholder="**********"
                />
              </FormControl>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
                onClick={() => setShowConfirmPassword(!showPassword)}
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                <span className="sr-only">
                  {showConfirmPassword ? "Hide password" : "Show password"}
                </span>
              </Button>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
