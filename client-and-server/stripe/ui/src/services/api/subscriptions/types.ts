export interface Subscription {
  id: string;
  currency: string;
  plan: { amount: number };
}
