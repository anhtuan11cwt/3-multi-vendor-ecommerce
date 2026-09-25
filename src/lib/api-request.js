import { toast } from "sonner";

export async function makePostRequest({
  setLoading,
  endpoint,
  data,
  resourceName,
  reset,
  setImageUrl,
  redirect,
}) {
  setLoading(true);
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(`${baseUrl}/${endpoint}`, {
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });

    if (response.ok) {
      toast.success(`${resourceName} đã tạo thành công`, {
        duration: 2000,
      });
      if (reset) reset();
      if (setImageUrl) setImageUrl("");
      if (redirect) redirect();
    } else {
      toast.error(`Tạo ${resourceName} thất bại`, { duration: 2000 });
    }
  } catch {
    toast.error("Đã xảy ra lỗi", { duration: 2000 });
  } finally {
    setLoading(false);
  }
}

export async function makePutRequest({
  setLoading,
  endpoint,
  data,
  resourceName,
  redirect,
}) {
  setLoading(true);
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = await fetch(`${baseUrl}/${endpoint}`, {
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
      method: "PUT",
    });

    if (response.ok) {
      toast.success(`Cập nhật ${resourceName} thành công`, { duration: 2000 });
      if (redirect) redirect();
    } else {
      const body = await response.json().catch(() => ({}));
      toast.error(body.message || `Cập nhật ${resourceName} thất bại`, {
        duration: 2000,
      });
    }
  } catch {
    toast.error("Đã xảy ra lỗi", { duration: 2000 });
  } finally {
    setLoading(false);
  }
}
