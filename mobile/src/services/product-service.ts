import axios from 'axios';
import { API_BASE_URL } from '../constants';
import { GetProductsResponse } from '../features/product/types';

const getProducts = async (accessToken: string): Promise<GetProductsResponse> => {
    var response = await axios.get<GetProductsResponse>(
        `${API_BASE_URL}/product`,
        {
            headers: { Authorization: `Bearer ${accessToken}` }
        })
    return response.data!;
};

export const productService = {
    getProducts
};
