"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SignupSchemaType } from "@/auth/schemas/signup.schema";
import { Control } from "react-hook-form";
import { countries } from "@/auth/content/signup";

interface Props {
  control: Control<SignupSchemaType>;
}

export const Step0 = ({ control }: Props) => {
  return (
    <>
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem className="grid gap-3">
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input
                placeholder="John Doe"
                {...field}
                required
                autoComplete="name"
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem className="grid gap-3">
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                placeholder="m@example.com"
                {...field}
                required
                autoComplete="email"
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="country"
        render={({ field }) => (
          <FormItem className="grid gap-3">
            <FormLabel>Country</FormLabel>
            <FormControl>
              <Select
                value={field.value}
                onValueChange={(value) => field.onChange(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
