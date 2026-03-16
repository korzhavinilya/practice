export interface ProductSchema {
  id: string;
  name: string;
  user_id: string;
}

export interface ProductQueryResult {
  id: string;
  name: string;
  user_id: string;

  subscription_id: string | null;
  current_period_start: number | null;
  current_period_end: number | null;
}
