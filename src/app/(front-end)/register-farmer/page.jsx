import RegisterForm from "@/components/front-end/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RegisterFarmerPage() {
  return (
    <div className="mx-auto w-full max-w-md space-y-3 min-[400px]:space-y-4">
      <Card className="max-[400px]:[--card-spacing:--spacing(4)]">
        <CardHeader>
          <CardTitle className="break-words text-center text-lg leading-snug min-[400px]:text-2xl">
            Đăng ký làm nông dân
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </div>
  );
}
