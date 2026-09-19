import SideBarCategories from "./SideBarCategories";

export default function CategorySidebar() {
  return (
    <div className="overflow-hidden rounded-md border border-gray-200 dark:border-gray-600">
      <div className="border-gray-200 border-b bg-slate-100 px-4 py-3 dark:border-gray-600 dark:bg-slate-700">
        <h3 className="font-bold text-slate-800 dark:text-slate-100">
          Mua sắm theo danh mục
        </h3>
      </div>

      <div className="h-[300px] overflow-y-auto bg-white dark:bg-slate-800">
        <SideBarCategories />
      </div>
    </div>
  );
}
