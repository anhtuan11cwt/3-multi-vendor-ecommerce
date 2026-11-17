"use client";

import { ChevronRight, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { setCurrentStep } from "@/store/checkoutSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function Steps({ steps }) {
  const dispatch = useAppDispatch();
  const currentStep = useAppSelector((state) => state.checkout.currentStep);

  return (
    <nav className="mb-8">
      <ol className="flex flex-wrap items-center gap-x-1 gap-y-2 text-sm md:text-base">
        <li className="flex items-center gap-1">
          <Link
            className="flex items-center gap-1 font-medium text-slate-500 transition-colors hover:text-lime-600 dark:text-slate-400 dark:hover:text-lime-400"
            href="/cart"
          >
            <ShoppingCart size={16} />
            Giỏ hàng
          </Link>
          <ChevronRight
            aria-hidden="true"
            className="text-slate-400 dark:text-slate-500"
            size={16}
          />
        </li>

        {steps.map((step, index) => {
          const isActive = step.number === currentStep;
          const canGoBack = step.number < currentStep;

          const labelClass = isActive
            ? "font-semibold text-lime-600 dark:text-lime-400"
            : "font-medium text-slate-500 dark:text-slate-400";

          return (
            <li className="flex items-center gap-1" key={step.number}>
              {canGoBack ? (
                <button
                  aria-label={`Quay lại bước ${step.number}: ${step.title}`}
                  className={`${labelClass} cursor-pointer transition-colors hover:text-lime-600 dark:hover:text-lime-400`}
                  onClick={() => dispatch(setCurrentStep(step.number))}
                  title={`Quay lại bước ${step.number}: ${step.title}`}
                  type="button"
                >
                  {step.title}
                </button>
              ) : (
                <p className={labelClass}>{step.title}</p>
              )}
              {index < steps.length - 1 && (
                <ChevronRight
                  aria-hidden="true"
                  className="text-slate-400 dark:text-slate-500"
                  size={16}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
