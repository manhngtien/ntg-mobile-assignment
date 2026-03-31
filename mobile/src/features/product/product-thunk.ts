import { createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from '../../models/product';
import { productService } from '../../services/apis/product-service';

export const fetchProducts = createAsyncThunk<Product[], { category: string }>(
  'product/fetchProducts',
  async ({ category }, { rejectWithValue }) => {
    try {
      const response = await productService.getProducts(category);
      return response.data;
    } catch (error: any) {
      return rejectWithValue('Failed to fetch products. Please try again.');
    }
  },
);

export const fetchProductById = createAsyncThunk<Product | null, number>(
  'product/fetchProductById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await productService.getProductById(id);
      return response.data ?? null;
    } catch (error: any) {
      return rejectWithValue('Failed to fetch product. Please try again.');
    }
  },
);
