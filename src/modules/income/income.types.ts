export type IncomeQuery = {
  page?: number;
  limit?: number;
  from?: string;
  to?: string;
  category?: string;
  payment_method?: string;
  client_name?: string;
  amount_min?: number;
  amount_max?: number;
  search?: string;
};