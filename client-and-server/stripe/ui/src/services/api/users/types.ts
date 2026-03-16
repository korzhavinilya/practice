export interface User {
  id: string;
  email: string;
  stripe_customer_id: string | null;
}
