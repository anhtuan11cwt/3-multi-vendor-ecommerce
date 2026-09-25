import FormHeader from "@/components/back-office/form-header";
import NewCategoryForm from "@/components/back-office/forms/NewCategoryForm";
import { getData } from "@/lib/getData";

export default async function UpdateCategoryPage({ params }) {
  const { id } = await params;
  const category = await getData(`categories/${id}`);

  return (
    <div className="mx-auto max-w-4xl space-y-4">
      <FormHeader title="Cập nhật danh mục" />
      <NewCategoryForm updateData={category} />
    </div>
  );
}
