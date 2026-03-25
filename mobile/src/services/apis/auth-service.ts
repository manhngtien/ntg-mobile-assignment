import axios from 'axios';
import { LoginRequest, LoginResponse, AuthResponse } from '../../features/auth/types';
import { API_BASE_URL } from '../../constants';

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

export const authService = {
    login,
    getUser
};
