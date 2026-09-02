import Link from "next/link";

export default function NotFound() {
  return (
    <section
      className="dark:bg-gray-900"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 font-extrabold text-7xl text-primary tracking-tight lg:text-9xl">
            404
          </h1>
          <p className="mb-4 font-bold text-3xl text-gray-900 tracking-tight md:text-4xl dark:text-white">
            Không tìm thấy trang.
          </p>
          <p className="mb-4 font-light text-gray-500 text-lg dark:text-gray-400">
            Xin lỗi, chúng tôi không thể tìm thấy trang này. Bạn sẽ tìm thấy
            nhiều thứ để khám phá trên trang chủ.
          </p>
          <Link
            className="my-4 inline-flex rounded-lg bg-primary px-5 py-2.5 text-center font-medium text-primary-foreground text-sm hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/30"
            href="/"
          >
            Quay lại trang chủ
          </Link>
        </div>
      </div>
    </section>
  );
}
