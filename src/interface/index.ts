export interface ICartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
}
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

export interface IFormInput {
  email: string;
  password: string;
}

export interface AuthState {
  user: { email: string } | null;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export interface AuthResponse {
  data: {
    access_token: string;
    user: { email: string };
  };
}
