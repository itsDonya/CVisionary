import { notify } from "./ToasterProvider";

export const useNotifications = () => {
  const showSuccess = (message: string) => {
    notify.success(message);
  };

  const showError = (message: string) => {
    notify.error(message);
  };

  const showInfo = (message: string) => {
    notify(message);
  };

  const showWarning = (message: string) => {
    notify(message, {
      style: { background: "#F59E0B", color: "#fff" },
    });
  };

  const showLoading = (message: string) => {
    return notify.loading(message);
  };

  const dismiss = (toastId?: string) => {
    notify.dismiss(toastId);
  };

  return {
    showSuccess,
    showError,
    showInfo,
    showWarning,
    showLoading,
    dismiss,
  };
};
