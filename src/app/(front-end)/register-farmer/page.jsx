import RegisterForm from "@/components/front-end/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RegisterFarmerPage() {
  return (
    <div className="mx-auto max-w-md space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl">
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
