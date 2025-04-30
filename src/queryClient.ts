import { QueryClient } from "@tanstack/react-query";

// إنشاء QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // إعادة المحاولة مرة واحدة فقط
      staleTime: 5 * 60 * 1000, // البيانات تبقى "طازجة" لمدة 5 دقائق
    },
  },
});

export default queryClient;
