"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
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
import { passwordSchema, vietnameseNameSchema } from "@/lib/validations/common";

const registerSchema = z.object({
  email: z.string().trim().email("Email không hợp lệ"),
  name: vietnameseNameSchema,
  password: passwordSchema,
});

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const role = pathname.includes("register-farmer") ? "FARMER" : "USER";

  const form = useForm({
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data) {
    setIsLoading(true);
    setEmailError("");

    try {
      const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
      const payload = { ...data, role };

      const response = await fetch(`${baseURL}/api/users`, {
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });

      const responseData = await response.json();

      if (response.ok) {
        const userRole = responseData.data?.role || role;
        const userId = responseData.data?.id;

        toast.success("Tạo tài khoản thành công", { duration: 2000 });

        if (userRole === "FARMER" && userId) {
          router.push(`/onboarding/${userId}`);
        } else {
          router.push("/");
        }
      } else if (response.status === 409) {
        setEmailError("Email đã được sử dụng");
      } else {
        toast.error("Đã xảy ra lỗi", { duration: 2000 });
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
        <input name="role" type="hidden" value={role} />

        <Controller
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Họ và tên</FieldLabel>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                className={cn(
                  isLoading &&
                    "pointer-events-none cursor-not-allowed opacity-50",
                )}
                disabled={isLoading}
                id={field.name}
                placeholder="Nhập họ và tên"
                type="text"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                className={cn(
                  isLoading &&
                    "pointer-events-none cursor-not-allowed opacity-50",
                )}
                disabled={isLoading}
                id={field.name}
                placeholder="Nhập địa chỉ email"
                type="email"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              {emailError && (
                <p className="mt-1 text-red-600 text-sm">{emailError}</p>
              )}
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
                    "pr-10",
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

        <div className="pt-4">
          <Button
            className={cn(
              "w-full",
              isLoading && "pointer-events-none cursor-not-allowed opacity-50",
            )}
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? "Đang đăng ký..." : "Đăng ký"}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
}
