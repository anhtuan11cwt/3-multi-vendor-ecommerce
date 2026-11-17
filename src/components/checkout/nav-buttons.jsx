"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentStep } from "@/store/checkoutSlice";

export default function NavButtons({ nextLabel = "Tiếp tục" }) {
  const dispatch = useDispatch();
  const currentStep = useSelector((state) => state.checkout.currentStep);

  const handlePrevious = () => {
    if (currentStep > 1) {
      dispatch(setCurrentStep(currentStep - 1));
    }
  };

  return (
    <div className="mt-6 flex items-center justify-between gap-3">
      {currentStep > 1 ? (
        <button
          className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-6 py-3 font-medium text-slate-600 text-sm transition-colors hover:border-slate-400 hover:text-slate-800 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-slate-100"
          onClick={handlePrevious}
          type="button"
        >
          <ChevronLeft size={16} />
          Quay lại
        </button>
      ) : (
        <span />
      )}

      <button
        className="flex items-center gap-1.5 rounded-lg bg-lime-600 px-6 py-3 font-medium text-sm text-white transition-colors hover:bg-lime-700 dark:bg-lime-600 dark:hover:bg-lime-700"
        type="submit"
      >
        {nextLabel}
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
