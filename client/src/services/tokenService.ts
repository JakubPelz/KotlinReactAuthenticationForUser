import axios, { AxiosResponse } from 'axios';

import apiPaths from 'enums/apiPaths';

export interface ITokens {
    accessToken: string;
    refreshToken: string;
}

export interface IUserLoginData {
    username: string;
    password: string;
}
export const postTokens = async (userLoginData: IUserLoginData) => {
    return await axios({
        method: 'POST',
        url: apiPaths.TOKENS,
        data: userLoginData
    }).then((resp: AxiosResponse<ITokens>) => resp.data);
};

export const putTokens = async () => {
    return await axios({
        method: 'PUT',
        url: apiPaths.TOKENS
    }).then((resp: AxiosResponse<ITokens>) => resp.data);
};

export const deleteTokens = async () => {
    return await axios({
        method: 'DELETE',
        url: apiPaths.TOKENS
    }).then((resp: AxiosResponse) => resp.data);
};
