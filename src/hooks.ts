import { useDispatch } from "react-redux";
import type { AppDispatch } from "./app/store";

// Hook مخصص لـ dispatch مع النوع الصحيح
export const useAppDispatch = () => useDispatch<AppDispatch>();
