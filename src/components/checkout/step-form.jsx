"use client";

import { useSelector } from "react-redux";
import OrderSummary from "./step-forms/order-summary";
import PaymentMethodForm from "./step-forms/payment-method-form";
import PersonalDetailsForm from "./step-forms/personal-details-form";
import ShippingDetailsForm from "./step-forms/shipping-details-form";

function renderFormByStep(step) {
  if (step === 1) return <PersonalDetailsForm />;
  if (step === 2) return <ShippingDetailsForm />;
  if (step === 3) return <PaymentMethodForm />;
  if (step === 4) return <OrderSummary />;
  return null;
}

export default function StepForm() {
  const currentStep = useSelector((state) => state.checkout.currentStep);

  return <div>{renderFormByStep(currentStep)}</div>;
}
