import ForgotPasswordForm from "@/components/front-end/ForgotPasswordForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ForgotPasswordPage() {
  return (
    <div className="mx-auto w-full max-w-md space-y-3 min-[400px]:space-y-4">
      <Card className="max-[400px]:[--card-spacing:--spacing(4)]">
        <CardHeader>
          <CardTitle className="break-words text-center text-lg leading-snug min-[400px]:text-2xl">
            Quên mật khẩu
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ForgotPasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}
