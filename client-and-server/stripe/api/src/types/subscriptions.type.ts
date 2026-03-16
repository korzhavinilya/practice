export interface SubscriptionSchema {
  id: string;
  user_id: string;
  product_id: string;
  current_period_start: number;
  current_period_end: number;
}
