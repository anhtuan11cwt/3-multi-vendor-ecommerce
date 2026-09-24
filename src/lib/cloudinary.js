import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
});

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export function getCloudinaryPublicId(url) {
  if (!url || typeof url !== "string") return null;
  if (!url.includes("res.cloudinary.com")) return null;
  if (CLOUD_NAME && !url.includes(`res.cloudinary.com/${CLOUD_NAME}`)) {
    return null;
  }

  const uploadIndex = url.indexOf("/upload/");
  if (uploadIndex === -1) return null;

  const marker = "/upload/";
  const afterUpload = url.slice(uploadIndex + marker.length).split("?")[0];
  if (!afterUpload) return null;

  const segments = afterUpload.split("/");
  const versionIndex = segments.findIndex((segment) => /^v\d+$/.test(segment));
  const idSegments =
    versionIndex === -1 ? segments : segments.slice(versionIndex + 1);
  if (idSegments.length === 0) return null;

  const lastSegment = idSegments[idSegments.length - 1];
  idSegments[idSegments.length - 1] = lastSegment.replace(/\.[^/.]+$/, "");

  return idSegments.join("/");
}

export async function deleteCloudinaryImage(url) {
  const publicId = getCloudinaryPublicId(url);
  if (!publicId) return false;

  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });
    if (result?.result !== "ok" && result?.result !== "not found") {
      console.warn("Cloudinary destroy không thành công:", publicId, result);
      return false;
    }
    return true;
  } catch (error) {
    console.warn("Không thể xóa ảnh trên Cloudinary:", publicId, error.message);
    return false;
  }
}

export async function deleteCloudinaryImages(urls) {
  const uniqueUrls = [...new Set(urls.filter(Boolean))];
  await Promise.all(uniqueUrls.map((url) => deleteCloudinaryImage(url)));
}
