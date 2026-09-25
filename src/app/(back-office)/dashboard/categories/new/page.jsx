import FormHeader from "@/components/back-office/form-header";
import NewCategoryForm from "@/components/back-office/forms/NewCategoryForm";

export default function NewCategoryPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-4">
      <FormHeader title="Tạo danh mục mới" />
      <NewCategoryForm />
    </div>
  );
}
