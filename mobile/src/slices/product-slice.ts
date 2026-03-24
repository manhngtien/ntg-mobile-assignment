import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../thunks/app-thunk';
import { apiService } from '../services/api-service';
import { ToastAndroid } from 'react-native';
import { ProductResponse } from '../types/responses/product-responses';

interface ProductState {
  products: ProductResponse[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    fetchProductsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess: (state, action: PayloadAction<ProductResponse[]>) => {
      state.loading = false;
      state.products = action.payload;
    },
    fetchProductsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure } = productSlice.actions;

export const fetchProducts = (accessToken: string): AppThunk => async (dispatch) => {
  dispatch(fetchProductsStart());

  try {
    const response = await apiService.getProducts(accessToken);
    dispatch(fetchProductsSuccess(response.data));
  }
  catch (error) {
    let errorMessage = error ? String(error) : 'Unknown error';
    dispatch(fetchProductsFailure(errorMessage));
    ToastAndroid.show("Failed to fetch products. Please try again.", ToastAndroid.LONG);
  }
};

export const selectProducts = (state: { product: ProductState }) => state.product.products;
export const selectProductsLoading = (state: { product: ProductState }) => state.product.loading;
export const selectProductsError = (state: { product: ProductState }) => state.product.error;

export default productSlice.reducer;
