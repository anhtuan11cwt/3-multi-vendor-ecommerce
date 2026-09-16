"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { passwordSchema } from "@/lib/validations/common";

const loginSchema = z.object({
  email: z.string().trim().email("Email không hợp lệ"),
  password: passwordSchema,
});

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data) {
    setIsLoading(true);

    try {
      const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

      const response = await fetch(`${baseURL}/api/users`, {
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });

      if (response.ok) {
        toast.success("Đăng nhập thành công", { duration: 2000 });
        router.push("/");
      } else {
        toast.error("Email hoặc mật khẩu không đúng", { duration: 2000 });
      }
    } catch {
      toast.error("Đã xảy ra lỗi", { duration: 2000 });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Địa chỉ email</FieldLabel>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                className={cn(
                  "p-2",
                  isLoading &&
                    "pointer-events-none cursor-not-allowed opacity-50",
                )}
                disabled={isLoading}
                id={field.name}
                placeholder="Nhập địa chỉ email"
                type="email"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Mật khẩu</FieldLabel>
              <div className="relative">
                <Input
                  {...field}
                  aria-invalid={fieldState.invalid}
                  className={cn(
                    "p-2 pr-10",
                    isLoading &&
                      "pointer-events-none cursor-not-allowed opacity-50",
                  )}
                  disabled={isLoading}
                  id={field.name}
                  placeholder="Nhập mật khẩu"
                  type={showPassword ? "text" : "password"}
                />
                <button
                  className={cn(
                    "absolute top-1/2 right-2 -translate-y-1/2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200",
                    isLoading &&
                      "pointer-events-none cursor-not-allowed opacity-50 hover:text-slate-500 dark:hover:text-slate-400",
                  )}
                  disabled={isLoading}
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <div className="pt-2">
          <Button
            className={cn(
              "w-full p-2",
              isLoading && "pointer-events-none cursor-not-allowed opacity-50",
            )}
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>
        </div>

        <p className="text-center text-slate-600 text-sm dark:text-slate-400">
          Chưa có tài khoản?{" "}
          <Link
            className={cn(
              "font-medium text-lime-600 hover:underline dark:text-lime-400",
              isLoading &&
                "pointer-events-none cursor-not-allowed opacity-50 hover:no-underline",
            )}
            href="/register"
          >
            Đăng ký
          </Link>{" "}
          hoặc{" "}
          <Link
            className={cn(
              "font-medium text-lime-600 hover:underline dark:text-lime-400",
              isLoading &&
                "pointer-events-none cursor-not-allowed opacity-50 hover:no-underline",
            )}
            href="/register-farmer"
          >
            Đăng ký làm nông dân
          </Link>
        </p>
      </FieldGroup>
    </form>
  );
}
