import { Product } from "../../models/product";

export interface GetProductsResponse {
  status: boolean;
  data: Product[];
}

export interface GetProductByIdResponse {
  status: boolean;
  data?: Product;
}
