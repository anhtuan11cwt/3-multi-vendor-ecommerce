import { v2 as cloudinary } from "cloudinary";
import { findImagesInUse } from "@/lib/image-usage";

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

async function destroyImage(url) {
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

export async function deleteCloudinaryImage(url) {
  if (!url) return false;

  // Nhiều bản ghi có thể dùng chung1 URL ảnh → chỉ xóa khi không còn ai tham chiếu
  const inUse = await findImagesInUse([url]);
  if (inUse.has(url)) {
    console.log("Giữ lại ảnh còn được bản ghi trong CSDL tham chiếu:", url);
    return false;
  }

  return destroyImage(url);
}

export async function deleteCloudinaryImages(urls) {
  const uniqueUrls = [...new Set(urls.filter(Boolean))];
  if (uniqueUrls.length === 0) return;

  const inUse = await findImagesInUse(uniqueUrls);

  await Promise.all(
    uniqueUrls.map((url) => {
      if (inUse.has(url)) {
        console.log("Giữ lại ảnh còn được bản ghi trong CSDL tham chiếu:", url);
        return undefined;
      }
      return destroyImage(url);
    }),
  );
}
