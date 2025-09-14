import toast, { Toaster } from "react-hot-toast";

export const ToasterProvider = () => {
  return (
    <Toaster
      position="bottom-right"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      toastOptions={{
        // Default options
        duration: 3000,
        style: {
          background: "#333",
          color: "#fff",
          borderRadius: "8px",
          padding: "16px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        },

        // custom styles
        success: {
          style: {
            background: "#10B981",
            color: "#fff",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#10B981",
          },
        },
        error: {
          style: {
            background: "#EF4444",
            color: "#fff",
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#EF4444",
          },
        },
        loading: {
          style: {
            background: "#3B82F6",
            color: "#fff",
          },
        },
      }}
    />
  );
};

export const notify = toast;
