import * as yup from "yup";

// 🧩 جزء مشترك: email + password
const baseAuthSchema = yup.object({
  email: yup
    .string()
    .required("Email is required!")
    .matches(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, "Not valid Email!"),
  password: yup
    .string()
    .required("Password is required!")
    .min(6, "Password at least 6 characters!"),
});

// 🟢Register
export const registerSchema = baseAuthSchema.shape({
  username: yup
    .string()
    .required("Username is required!")
    .min(5, "Username at least 5 characters!"),
});

export const loginSchema = baseAuthSchema;
