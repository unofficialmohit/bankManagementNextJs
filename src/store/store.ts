import { configureStore } from "@reduxjs/toolkit";
import accountSlice from "../slice/accountSlice";
export const store=configureStore({
    reducer:accountSlice
})