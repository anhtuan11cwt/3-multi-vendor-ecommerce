import { createSlice } from "@reduxjs/toolkit";

const checkoutSlice = createSlice({
  initialState: {
    checkoutFormData: {},
    currentStep: 1,
  },
  name: "checkout",
  reducers: {
    resetCheckout(state) {
      state.currentStep = 1;
      state.checkoutFormData = {};
    },
    setCurrentStep(state, action) {
      state.currentStep = action.payload;
    },
    updateCheckoutFormData(state, action) {
      state.checkoutFormData = {
        ...state.checkoutFormData,
        ...action.payload,
      };
    },
  },
});

export const { setCurrentStep, updateCheckoutFormData, resetCheckout } =
  checkoutSlice.actions;
export default checkoutSlice.reducer;
