import FormHeader from "@/components/back-office/form-header";
import BannerForm from "@/components/back-office/forms/BannerForm";
import { getData } from "@/lib/getData";

export default async function UpdateBannerPage({ params }) {
  const { id } = await params;
  const banner = await getData(`banners/${id}`);

  return (
    <div className="mx-auto max-w-4xl space-y-4">
      <FormHeader title="Cập nhật banner" />
      <BannerForm updateData={banner} />
    </div>
  );
}
