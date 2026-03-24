export interface ProductResponse {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  priceUnit: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetProductsResponse {
  status: boolean;
  data: ProductResponse[];
}
