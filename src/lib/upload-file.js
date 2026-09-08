export async function uploadFile(file, type) {
  const formData = new FormData();
  formData.append("file", file);
  if (type) formData.append("type", type);

  const response = await fetch("/api/upload", {
    body: formData,
    method: "POST",
  });

  if (!response.ok) throw new Error("Tải lên thất bại");

  const result = await response.json();
  return result.secure_url;
}
