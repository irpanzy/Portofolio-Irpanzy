import { useGlobalLoading } from "@/hooks/useGlobalLoading";

export const withLoading = async <T>(
  fn: () => Promise<T>,
  loadingMessage: string
): Promise<T> => {
  const { setLoading } = useGlobalLoading.getState();
  try {
    setLoading(true, loadingMessage);
    const result = await fn();
    setLoading(false);
    return result;
  } catch (error) {
    setLoading(false);
    throw error;
  }
};
