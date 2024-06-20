import axios, { AxiosResponse } from 'axios';

import apiPaths from 'enums/apiPaths';

export interface ICreateUser {
    name: string;
    username: string;
    password?: string;
}

export interface ILoggedUser {
    id: number;
    name: string;
    username: string;
}

export interface IUser extends ILoggedUser {
    password: string;
}

export interface IUpdatePerson {
    name?: string;
    username?: string;
    password?: string;
}

export const postCreateUser = async (queryParameters: ICreateUser) => {
    return await axios({
        method: 'POST',
        url: apiPaths.USERS,
        params: queryParameters
    }).then((resp: AxiosResponse) => resp.data);
};

export const getUserById = async (id: number) => {
    return await axios({
        method: 'GET',
        url: apiPaths.USERS + id
    }).then((resp: AxiosResponse<IUser>) => resp.data);
};

export const getUserByUsername = async (name: string, token: string) => {
    return await axios({
        method: 'GET',
        url: apiPaths.USERS_USERNAME + name,
        headers: {
            Authorization: 'Bearer ' + token
        }
    }).then((resp: AxiosResponse<ILoggedUser>) => resp.data);
};

export const getUserFromToken = async () => {
    return await axios({
        method: 'GET',
        url: apiPaths.USERS_TOKEN
    }).then((resp: AxiosResponse<IUser>) => resp.data);
};

export const getUsers = async () => {
    return await axios({
        method: 'GET',
        url: apiPaths.USERS
    }).then((resp: AxiosResponse<IUser[]>) => resp.data);
};

export const putUpdateUserById = async (id: number, data: IUpdatePerson) => {
    return await axios({
        method: 'PUT',
        url: apiPaths.USERS + id,
        data: data
    }).then((resp: AxiosResponse) => resp.data);
};

export const deleteUserById = async (id: number) => {
    return await axios({
        method: 'DELETE',
        url: apiPaths.USERS + id
    }).then((resp: AxiosResponse) => resp.data);
};
