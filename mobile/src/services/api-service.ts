import axios from 'axios';
import { LoginRequest } from '../types/requests/login-requests';
import { API_BASE_URL } from '../constants';
import { LoginResponse } from '../types/responses/login-responses';
import { AuthResponse } from '../types/responses/auth-response';

const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
    return (await axios.post<LoginResponse>(`${API_BASE_URL}/login`, credentials)).data!;
};

const getUser = async (accessToken: string): Promise<AuthResponse> => {
    var response = await axios.get<AuthResponse>(
        `${API_BASE_URL}/user`,
        {
            headers: { Authorization: `Bearer ${accessToken}` }
        })
    return response.data!;
};

export const apiService = {
    fetchData: () => axios.get('https://jsonplaceholder.typicode.com/photos'),
    login,
    getUser
};