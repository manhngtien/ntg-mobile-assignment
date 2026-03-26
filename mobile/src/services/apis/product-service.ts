import axios from 'axios';
import { API_BASE_URL } from '../../constants';
import { GetProductsResponse } from '../../features/product/types';
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

export const productService = {
    getProducts
};
