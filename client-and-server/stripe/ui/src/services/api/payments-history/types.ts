export interface History {
  id: string;
  amount: number;
  currency: string;
  payment_method_types: string[];
  description: string | null;
}
