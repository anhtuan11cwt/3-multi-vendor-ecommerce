"use client";

import { useMemo, useState } from "react";
import addressData from "vietnam-address-database";

const provinces = addressData.find((d) => d.name === "provinces")?.data || [];
const allWards = addressData.find((d) => d.name === "wards")?.data || [];

export default function LocationSelect() {
  const [selectedProvince, setSelectedProvince] = useState("");

  const wards = useMemo(() => {
    if (!selectedProvince) return [];
    return allWards.filter((w) => w.province_code === selectedProvince);
  }, [selectedProvince]);

  return (
    <div className="space-y-2">
      <select
        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200"
        onChange={(e) => setSelectedProvince(e.target.value)}
        value={selectedProvince}
      >
        <option value="">Chọn tỉnh/thành phố</option>
        {provinces.map((p) => (
          <option key={p.id} value={p.province_code}>
            {p.name}
          </option>
        ))}
      </select>

      <select
        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200"
        disabled={!selectedProvince}
      >
        <option value="">
          {selectedProvince ? "Chọn phường/xã" : "Chọn tỉnh trước"}
        </option>
        {wards.map((w) => (
          <option key={w.id} value={w.ward_code}>
            {w.name}
          </option>
        ))}
      </select>
    </div>
  );
}
