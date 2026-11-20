import { Suspense } from "react";
import LoginForm from "@/components/front-end/LoginForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="mx-auto w-full max-w-md space-y-3 min-[400px]:space-y-4">
      <Card className="max-[320px]:[--card-spacing:--spacing(3)] max-[400px]:[--card-spacing:--spacing(4)]">
        <CardHeader>
          <CardTitle className="break-words text-center text-lg leading-snug min-[400px]:text-2xl">
            Đăng nhập vào tài khoản
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense>
            <LoginForm />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
