import { AxiosError } from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { deleteTokens } from 'services/tokenService';

import routePathEnum from 'enums/routePathEnum';

import { useGlobalStore } from './useGlobalStore';

const useLocalLogout = () => {
    const { resetGlobalStore } = useGlobalStore();
    const [loading, setLoading] = React.useState<boolean>(false);
    const navigate = useNavigate();

    const localLogout = (callback?: Function) => {
        setLoading(true);
        deleteTokens().catch((error: AxiosError) => {
            console.log('JPE error', error);
        });
        resetGlobalStore();
        sessionStorage.clear();
        callback && callback();
        setTimeout(() => {
            navigate(routePathEnum.DEFAULT_PAGE);
        }, 1000);
    };
    return {
        loading,
        localLogout
    };
};

export default useLocalLogout;
