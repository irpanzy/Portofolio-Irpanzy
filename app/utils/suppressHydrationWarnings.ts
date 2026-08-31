export function suppressHydrationWarnings() {
  if (typeof window === "undefined" || process.env.NODE_ENV !== "development") {
    return;
  }

  const originalError = console.error;
  const originalWarn = console.warn;

  const ignoredPatterns = [
    "bis_skin_checked",
    "Hydration failed because the server rendered HTML didn't match the client",
    "There was an error while hydrating",
    "An error occurred during hydration",
    "chrome-extension://",
    "moz-extension://",
    "safari-extension://",
  ];

  const isExtensionError = (args: any[]): boolean => {
    return args.some((arg) => {
      const str = arg?.toString() || "";
      const stack = arg?.stack?.toString() || "";

      if (
        str.includes("chrome-extension://") ||
        str.includes("moz-extension://") ||
        str.includes("safari-extension://") ||
        stack.includes("chrome-extension://") ||
        stack.includes("moz-extension://") ||
        stack.includes("safari-extension://")
      ) {
        return true;
      }

      return (
        str.includes("bis_skin_checked") ||
        str.includes("data-new-gr-c-s-check-loaded") ||
        str.includes("data-gr-ext-installed") ||
        str.includes("__qoopido") ||
        str.includes("M_ID")
      );
    });
  };

  console.error = (...args: any[]) => {
    if (isExtensionError(args)) {
      return;
    }

    const message = args[0]?.toString() || "";

    const shouldIgnore = ignoredPatterns.some((pattern) =>
      message.includes(pattern)
    );

    if (shouldIgnore) {
      return;
    }

    originalError.apply(console, args);
  };

  console.warn = (...args: any[]) => {
    if (isExtensionError(args)) {
      return;
    }

    const message = args[0]?.toString() || "";

    const shouldIgnore = ignoredPatterns.some((pattern) =>
      message.includes(pattern)
    );

    if (shouldIgnore) {
      return;
    }

    originalWarn.apply(console, args);
  };

  window.addEventListener(
    "error",
    (event) => {
      const errorMessage = event.message || "";
      const errorSource = event.filename || "";

      if (
        errorSource.includes("chrome-extension://") ||
        errorSource.includes("moz-extension://") ||
        errorSource.includes("safari-extension://") ||
        errorMessage.includes("M_ID") ||
        errorMessage.includes("chrome-extension")
      ) {
        event.preventDefault();
        event.stopImmediatePropagation();
        return false;
      }
    },
    true
  );

  window.addEventListener("unhandledrejection", (event) => {
    const reason = event.reason?.toString() || "";
    const stack = event.reason?.stack?.toString() || "";

    if (
      reason.includes("chrome-extension://") ||
      reason.includes("moz-extension://") ||
      stack.includes("chrome-extension://") ||
      stack.includes("moz-extension://") ||
      reason.includes("M_ID")
    ) {
      event.preventDefault();
      return false;
    }
  });
}
