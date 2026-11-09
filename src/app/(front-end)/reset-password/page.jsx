import ResetPasswordForm from "@/components/front-end/ResetPasswordForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ResetPasswordPage({ searchParams }) {
  const { id = "", token = "" } = await searchParams;

  return (
    <div className="mx-auto w-full max-w-md space-y-3 min-[400px]:space-y-4">
      <Card className="max-[400px]:[--card-spacing:--spacing(4)]">
        <CardHeader>
          <CardTitle className="break-words text-center text-lg leading-snug min-[400px]:text-2xl">
            Đặt lại mật khẩu
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResetPasswordForm id={id} token={token} />
        </CardContent>
      </Card>
    </div>
  );
}
