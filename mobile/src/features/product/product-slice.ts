import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ToastAndroid } from 'react-native';
import { productService } from '../../services/apis/product-service';
import { Product } from '../../models/product';
import { secureStorageService } from '../../services/secure-storage-service';

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null
};

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

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        ToastAndroid.show('Failed to fetch products. Please try again.', ToastAndroid.LONG);
      });
  }
});

// Selectors
export const selectProducts = (state: { product: ProductState }) => state.product.products;
export const selectProductsLoading = (state: { product: ProductState }) => state.product.loading;
export const selectProductsError = (state: { product: ProductState }) => state.product.error;

export default productSlice.reducer;
