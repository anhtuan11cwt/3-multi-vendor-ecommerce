import FormHeader from "@/components/back-office/form-header";
import BannerForm from "@/components/back-office/forms/BannerForm";

export default function NewBannerPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-4">
      <FormHeader title="Tạo banner mới" />
      <BannerForm />
    </div>
  );
}
