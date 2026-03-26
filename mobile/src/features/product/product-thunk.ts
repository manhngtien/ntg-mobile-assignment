import { createAsyncThunk } from '@reduxjs/toolkit';
import { productService } from '../../services/apis/product-service';
import { Product } from '../../models/product';

export const fetchProducts = createAsyncThunk<Product[], { category: string }>(
  'product/fetchProducts',
  async ({ category }, { rejectWithValue }) => {
    try {
      const response = await productService.getProducts(category);
      return response.data;
    } catch (error: any) {
      return rejectWithValue('Failed to fetch products. Please try again.');
    }
  }
);
