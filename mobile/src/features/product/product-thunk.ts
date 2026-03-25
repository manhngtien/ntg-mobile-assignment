import { createAsyncThunk } from '@reduxjs/toolkit';
import { productService } from '../../services/apis/product-service';
import { Product } from '../../models/product';
import { secureStorageService } from '../../services/secure-storage-service';

export const fetchProducts = createAsyncThunk<Product[], void>(
  'product/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const token = await secureStorageService.loadToken();
      if (!token) {
        return rejectWithValue('No authentication token found. Please log in.');
      }
      const response = await productService.getProducts(token);
      return response.data;
    } catch (error: any) {
      await secureStorageService.removeToken();
      return rejectWithValue('Failed to fetch products. Please try again.');
    }
  }
);
