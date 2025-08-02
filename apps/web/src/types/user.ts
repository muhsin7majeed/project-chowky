export interface User {
  id: string;
  email: string;
  name?: string;
  role?: "admin" | "user";
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
