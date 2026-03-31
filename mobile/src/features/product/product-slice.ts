import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ToastAndroid } from 'react-native';
import { Product } from '../../models/product';
import { fetchProductById, fetchProducts } from './product-thunk';

interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
};

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
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selectedProduct = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<Product | null>) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        ToastAndroid.show('Failed to fetch product. Please try again.', ToastAndroid.LONG);
      });
  },
});

// Selectors
export const selectProducts = (state: { product: ProductState }) => state.product.products;
export const selectSelectedProduct = (state: { product: ProductState }) =>
  state.product.selectedProduct;
export const selectProductsLoading = (state: { product: ProductState }) => state.product.loading;
export const selectProductsError = (state: { product: ProductState }) => state.product.error;

export default productSlice.reducer;
