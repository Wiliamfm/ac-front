export type LoginRequest = {
  email: string;
  password: string;
}

export type RegisterRequest = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export type AuthResponse = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  roles: string;
  token: string;
}