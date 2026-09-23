import Image from "next/image";

export default function ImageColumn({ row, accessorKey = "imageUrl" }) {
  const imageUrl = row.getValue(accessorKey);
  return imageUrl ? (
    <Image
      alt=""
      className="rounded-md object-cover"
      height={40}
      src={imageUrl}
      width={40}
    />
  ) : null;
}
