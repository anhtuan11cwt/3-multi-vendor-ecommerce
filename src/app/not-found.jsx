import Link from "next/link";

export default function NotFound() {
  return (
    <section
      style={{ backgroundColor: "#ffffff" }}
      className="dark:bg-gray-900"
    >
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1
            style={{ color: "#2563eb" }}
            className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl dark:text-blue-500"
          >
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
            Không tìm thấy trang.
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            Xin lỗi, chúng tôi không thể tìm thấy trang này. Bạn sẽ tìm thấy
            nhiều thứ để khám phá trên trang chủ.
          </p>
          <Link
            href="/"
            style={{
              backgroundColor: "#2563eb",
              color: "#ffffff",
            }}
            className="inline-flex hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-900 my-4"
          >
            Quay lại trang chủ
          </Link>
        </div>
      </div>
    </section>
  );
}
