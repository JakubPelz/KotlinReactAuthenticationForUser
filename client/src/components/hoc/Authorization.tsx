import { Modal } from 'antd';
import axios, { AxiosError } from 'axios';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import React, { useEffect, useRef, useState } from 'react';
import { useIdleTimer } from 'react-idle-timer';
import { Outlet } from 'react-router-dom';

import NotificationComponent from 'components/atoms/NotificationComponent';
import Footer from 'components/molecules/Footer';

import { useGlobalStore } from 'hooks/useGlobalStore';
import useLocalLogout from 'hooks/useLocalLogout';
import useSetGlobalConfig from 'hooks/useSetGlobalConfig';
import useSetStore from 'hooks/useSetStore';
import useTranslateText from 'hooks/useTranslateText';

import { ITokens, putTokens } from 'services/tokenService';

import apiPaths from 'enums/apiPaths';
import { ENotificationType } from 'enums/notificationType';

import { createErrDescription } from 'utils/createErrDescription';

dayjs.extend(timezone);

// nastaveno na 30, lze zmenit pro testování automatického token refresh
let extractTimeFromToken = 900000;
export const Authorization: React.FC = () => {
    const { translateText } = useTranslateText();
    const { setConfig } = useSetGlobalConfig();
    const { localLogout } = useLocalLogout();
    const { setStore } = useSetStore();
    const { globalConfig, token } = useGlobalStore();
    const [myInterceptorResp, setMyInterceptorResp] = useState<number>();
    const [myInterceptorReq, setMyInterceptorReq] = useState<number>();
    const isTokenRefreshing = useRef<boolean | null>(false);
    const localToken = useRef<string | null>(null);

    /** Automatický refresh tokenů při práci s aplikací */
    const { start, getRemainingTime, reset } = useIdleTimer({
        timeout: extractTimeFromToken - 15 * 1000,
        throttle: 1000,
        events: [],
        startManually: true,
        stopOnIdle: false
    });

    useEffect(() => {
        if (!globalConfig && !globalConfig?.api?.restURL) {
            setConfig();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [globalConfig, globalConfig?.api.restURL]);

    // funkce pro refresh tokenu
    const refreshTokens = () => {
        const refreshToken = sessionStorage.getItem('refreshToken');

        if (!refreshToken) return;

        isTokenRefreshing.current = true;
        putTokens()
            .then((resp: ITokens) => {
                localToken.current = resp.accessToken;
                setStore('token', resp.accessToken);
                sessionStorage.setItem('refreshToken', resp.refreshToken);
                reset();
            })
            .catch((err: AxiosError) => {
                if (err?.response?.status === 401) {
                    isTokenRefreshing.current = null;
                    localLogout();
                    return Modal.error({
                        content: translateText('UPOZORNENI'),
                        title: translateText('LOGOUT_CONTENT')
                    });
                }
            });
    };

    // pokud není access token udělá refresh
    useEffect(() => {
        if (!token && !localToken.current && globalConfig) {
            refreshTokens();
        } else if (!sessionStorage.getItem('refreshToken') && !token) {
            setTimeout(() => {
                // když není token a není ani refresh token smaže localni token (logout)
                localToken.current = null;
            }, 1000);
        } else if (token) {
            localToken.current = token;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token, globalConfig]);

    /* musí zůstat v useEffectu v ide funkci se neprovede reset */
    useEffect(() => {
        if (!localToken.current) return;
        const tokenParts = localToken.current.split('.');
        const tokenPayloadString = atob(tokenParts[1]);
        const data = JSON.parse(tokenPayloadString);
        extractTimeFromToken = dayjs(data.exp * 1000).diff(dayjs(data.iat * 1000));
        const interval = setInterval(() => {
            if (Math.ceil(getRemainingTime() / 1000) <= 15) {
                refreshTokens();
                clearInterval(interval);
            }
        }, 1000);
        start();
        return () => {
            clearInterval(interval);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    /** Nastavení axiosu defaultní cesty pro REST */
    axios.defaults.baseURL = globalConfig?.api?.restURL;
    useEffect(() => {
        setMyInterceptorReq(
            axios.interceptors.request.use(
                async config => {
                    const controller = new AbortController();
                    config.signal = controller.signal;

                    return new Promise((resolve, reject) => {
                        if (isTokenRefreshing.current === null) {
                            controller.abort('Request Aborted with token refresh failure!');
                            reject(config);
                            return;
                        }

                        if (
                            localToken.current &&
                            config.headers &&
                            !(config.url?.includes(apiPaths.TOKENS) && config.method === 'post')
                        ) {
                            config.headers.Authorization = `Bearer ${
                                (config.url?.includes(apiPaths.TOKENS) && config.method === 'put') ||
                                (config.url?.includes(apiPaths.TOKENS) && config.method === 'delete')
                                    ? sessionStorage.getItem('refreshToken') || ''
                                    : localToken.current
                            }`;
                        }
                        if (
                            !localToken.current &&
                            config.headers &&
                            sessionStorage.getItem('refreshToken') &&
                            config.url?.includes(apiPaths.TOKENS) &&
                            config.method === 'put'
                        ) {
                            config.headers.Authorization = `Bearer ${sessionStorage.getItem('refreshToken')}`;
                        }

                        resolve(config);
                    });
                },
                error => {
                    return Promise.reject(error);
                }
            )
        );
        return () => {
            myInterceptorReq !== null &&
                myInterceptorReq !== undefined &&
                axios.interceptors.request.eject(myInterceptorReq);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (myInterceptorResp !== null && myInterceptorResp !== undefined) {
            axios.interceptors.response.eject(myInterceptorResp);
        }

        const interceptor = axios.interceptors.response.use(
            response => response,
            error => {
                if (axios.isAxiosError(error) && error.response?.status && error.config?.url) {
                    NotificationComponent({
                        title: 'CHYBA',
                        description: createErrDescription(error),
                        type: ENotificationType.ERROR,
                        duration: globalConfig?.variables?.ERROR_NOTIFICATION_TIMEOUT
                    });
                }
                return Promise.reject(error);
            }
        );

        setMyInterceptorResp(interceptor);

        return () => {
            if (myInterceptorResp !== null && myInterceptorResp !== undefined) {
                axios.interceptors.response.eject(myInterceptorResp);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Outlet />
            <Footer />
        </>
    );
};
