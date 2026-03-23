import axios from 'axios';
import { LoginRequest } from '../types/requests/login-requests';
import { API_BASE_URL } from '../constants';
import { LoginResponse } from '../types/responses/login-responses';

const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
    return (await axios.post<LoginResponse>(`${API_BASE_URL}/login`, credentials)).data!;
};

export const apiService = {
    fetchData: () => axios.get('https://jsonplaceholder.typicode.com/photos'),
    login
};