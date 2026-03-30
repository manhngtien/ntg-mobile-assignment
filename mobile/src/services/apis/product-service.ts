import axios from 'axios';
import { API_BASE_URL } from '../../constants';
import { GetProductByIdResponse, GetProductsResponse } from '../../features/product/types';
import { Product } from '../../models/product';
import { secureStorageService } from '../secure-storage-service';

const getProducts = async (category: string): Promise<GetProductsResponse> => {
    var url = `${API_BASE_URL}/product/${category ? `?category=${encodeURIComponent(category)}` : ''}`

    const accessToken = await secureStorageService.loadToken();

    var response = await axios.get<GetProductsResponse>(
        url,
        {
            headers: { Authorization: `Bearer ${accessToken}` }
        })
    return response.data!;
};

const getProductById = async (id: number): Promise<GetProductByIdResponse> => {
    const accessToken = await secureStorageService.loadToken();

    const response = await axios.get<GetProductByIdResponse>(
        `${API_BASE_URL}/product/${id}`,
        {
            headers: { Authorization: `Bearer ${accessToken}` }
        }
    )
    return response.data!;
};

export const productService = {
    getProducts,
    getProductById
};
