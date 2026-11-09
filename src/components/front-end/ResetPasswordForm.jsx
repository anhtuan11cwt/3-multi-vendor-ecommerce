"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
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
import { resetPasswordSchema } from "@/lib/validations/user";

export default function ResetPasswordForm({ id = "", token = "" }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      confirmPassword: "",
      password: "",
    },
    resolver: zodResolver(resetPasswordSchema),
  });

  async function onSubmit(data) {
    if (!id) {
      toast.error("Liên kết đặt lại mật khẩu không hợp lệ", { duration: 2000 });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/update-password`,
        {
          body: JSON.stringify({ id, password: data.password, token }),
          headers: { "Content-Type": "application/json" },
          method: "POST",
        },
      );

      if (!response.ok) {
        const result = await response.json();
        toast.error(result?.message || "Không thể cập nhật mật khẩu", {
          duration: 2000,
        });
        return;
      }

      toast.success("Cập nhật mật khẩu thành công", { duration: 2000 });
      router.push("/login");
    } catch {
      toast.error("Đã xảy ra lỗi", { duration: 2000 });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="gap-5 min-[400px]:gap-7">
        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Mật khẩu mới</FieldLabel>
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
                placeholder="Nhập mật khẩu mới"
                type="password"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="confirmPassword"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Xác nhận mật khẩu</FieldLabel>
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
                placeholder="Nhập lại mật khẩu mới"
                type="password"
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
            {isLoading ? "Đang cập nhật..." : "Cập nhật mật khẩu"}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
