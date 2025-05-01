import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";
import axiosInstance from "../../../config/axios.config";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

interface AuthResponse {
  data: {
    access_token: string;
  };
}

interface AuthState {
  accessToken: string | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: AuthState = {
  accessToken: null,
  loading: false,
  error: null,
  successMessage: null,
};

export const login = createAsyncThunk<
  { access_token: string },
  { credentials: LoginCredentials; navigate: NavigateFunction },
  { rejectValue: string }
>("auth/login", async ({ credentials, navigate }, { rejectWithValue }) => {
  try {
    console.log("Sending login request:", credentials);
    const response = await axiosInstance.post<AuthResponse>("/auth/login", credentials);
    const { access_token } = response.data.data;
    console.log("Login response:", { access_token });
    return { access_token };
  } catch (error: any) {
    console.error("Login API error:", error.response?.data || error.message);
    const errorMessage =
      error.response?.data?.errors?.[0]?.message ||
      error.response?.data?.message ||
      "Failed to log in";
    return rejectWithValue(errorMessage);
  }
});

export const register = createAsyncThunk<
  { access_token: string },
  { credentials: RegisterCredentials; navigate: NavigateFunction },
  { rejectValue: string }
>("auth/register", async ({ credentials, navigate }, { rejectWithValue }) => {
  try {
    console.log("Sending register request:", credentials);
    const response = await axiosInstance.post<AuthResponse>("/users", {
      ...credentials,
      role: "3eac52d9-8c90-4306-9f1e-882d378ed52a",
      status: "active",
    });
    const { access_token } = response.data.data;
    console.log("Register response:", { access_token });
    return { access_token };
  } catch (error: any) {
    console.error("Register API error:", error.response?.data || error.message);
    const errorCode = error?.response?.data?.errors?.[0]?.extensions?.code;
    const errorField = error?.response?.data?.errors?.[0]?.extensions?.field;
    if (errorCode === "RECORD_NOT_UNIQUE") {
      return rejectWithValue(
        errorField === "email" || errorField === "username"
          ? "Username or email is already taken."
          : "This field must be unique.",
      );
    }
    return rejectWithValue(error.response?.data?.errors?.[0]?.message || "Failed to register");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.accessToken = null;
      state.successMessage = "Logged out successfully!";
    },
    clearMessages: (state) => {
      state.successMessage = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.access_token;
        state.successMessage = "Logged in successfully!";
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.access_token;
        state.successMessage = "Registered successfully! Now login to access";
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearMessages } = authSlice.actions;
export default authSlice.reducer;
