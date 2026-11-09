"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { forgotPasswordSchema } from "@/lib/validations/user";

export default function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgotPasswordSchema),
  });

  async function onSubmit(data) {
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/forgot-password`,
        {
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
          method: "POST",
        },
      );

      if (!response.ok) {
        const result = await response.json();
        toast.error(
          result?.message || "Không thể gửi yêu cầu đặt lại mật khẩu",
          { duration: 2000 },
        );
        return;
      }

      setIsSent(true);
    } catch {
      toast.error("Đã xảy ra lỗi", { duration: 2000 });
    } finally {
      setIsLoading(false);
    }
  }

  if (isSent) {
    return (
      <div className="space-y-4 text-center">
        <p className="text-slate-600 text-sm leading-relaxed dark:text-slate-400">
          Vui lòng kiểm tra email của bạn, chúng tôi đã gửi cho bạn liên kết đặt
          lại mật khẩu.
        </p>
        <p className="text-slate-600 text-sm dark:text-slate-400">
          <Link
            className="font-medium text-lime-600 hover:underline dark:text-lime-400"
            href="/login"
          >
            Quay lại trang đăng nhập
          </Link>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="gap-5 min-[400px]:gap-7">
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

        <div className="pt-4 min-[400px]:pt-5">
          <Button
            className={cn(
              "w-full p-2",
              isLoading && "pointer-events-none cursor-not-allowed opacity-50",
            )}
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? "Đang gửi..." : "Gửi liên kết đặt lại mật khẩu"}
          </Button>
        </div>

        <p className="text-balance break-words text-center text-slate-600 text-sm leading-relaxed dark:text-slate-400">
          Nhớ mật khẩu?{" "}
          <Link
            className="font-medium text-lime-600 hover:underline dark:text-lime-400"
            href="/login"
          >
            Đăng nhập
          </Link>
        </p>
      </FieldGroup>
    </form>
  );
}
