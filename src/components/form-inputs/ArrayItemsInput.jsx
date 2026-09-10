"use client";

import { Plus, X } from "lucide-react";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function ArrayItemsInput({
  items = [],
  setItems,
  itemTitle,
  loading = false,
}) {
  const [item, setItem] = useState("");
  const [showForm, setShowForm] = useState(false);

  function addItem() {
    if (!item) return;
    setItems([...items, item]);
    setItem("");
  }

  function removeItem(index) {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  }

  return (
    <div className="space-y-2">
      <Label>{itemTitle}</Label>

      <div className={cn(loading && "pointer-events-none opacity-50")}>
        {!showForm && (
          <button
            className="flex items-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm transition-colors hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
            disabled={loading}
            onClick={() => setShowForm(true)}
            type="button"
          >
            <Plus size={16} />
            <span>Thêm {itemTitle}</span>
          </button>
        )}

        {showForm && (
          <div className="flex items-center gap-2">
            <input
              className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-50"
              disabled={loading}
              maxLength={20}
              onChange={(e) => setItem(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addItem();
                }
              }}
              placeholder={`Tạo ${itemTitle}`}
              value={item}
            />
            <button
              className="flex size-10 shrink-0 items-center justify-center rounded-md bg-lime-600 text-white transition-colors hover:bg-lime-700"
              disabled={loading}
              onClick={addItem}
              type="button"
            >
              <Plus size={16} />
            </button>
            <button
              className="flex size-10 shrink-0 items-center justify-center rounded-md bg-red-400 text-white transition-colors hover:bg-red-500"
              disabled={loading}
              onClick={() => {
                setShowForm(false);
                setItem("");
              }}
              type="button"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {items.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {items.map((currentItem) => (
              <div
                className="flex items-center gap-1.5 rounded-full bg-slate-200 px-3 py-1 text-slate-800 text-sm dark:bg-slate-600 dark:text-slate-200"
                key={currentItem}
              >
                <span>{currentItem}</span>
                <button
                  className="ml-1 flex size-4 shrink-0 items-center justify-center rounded-full bg-slate-400 text-white transition-colors hover:bg-slate-500 dark:bg-slate-500 dark:hover:bg-slate-400"
                  disabled={loading}
                  onClick={() => removeItem(items.indexOf(currentItem))}
                  type="button"
                >
                  <X size={10} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
