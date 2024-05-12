import { toast } from "react-toastify";

export const showToast = (message: string) => {
  toast.dismiss();
  toast.success(message);
};

export const showWarning = (message: string) => {
  toast.dismiss();

  toast.warn(message || "Something went wrong");
};

export const showError = (message: string) => {
  toast.dismiss();

  toast.error(message || "Something went wrong");
};
