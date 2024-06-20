import React, { lazy } from 'react';

import routePathEnum from '../enums/routePathEnum';

// komponenty načítané pomocí 'LazyLoading' - stahují se až když jsou opravdu vyžádány -> více menších JS 'chunks' po buildu

const DefaultPage = lazy(() => import('components/pages/DefaultPage'));
const MainPage = lazy(() => import('components/pages/MainPage'));
const Registration = lazy(() => import('components/pages/Registration'));
const Login = lazy(() => import('components/pages/Login'));

export interface IRouteMapa<T> {
    path: string; // Cesta vzata z enumu routePathEnum
    component: React.FC | React.ComponentType<T> | React.LazyExoticComponent<React.ComponentType<T>>; // Komponenty k zobrazení
    private?: boolean; // pouzit private = true pokud je potreba k pristupu token (prihlaseni)
}
export function routeMapa<T>(): IRouteMapa<T>[] {
    return [
        {
            component: DefaultPage,
            path: routePathEnum.DEFAULT_PAGE
        },
        {
            component: Login,
            path: routePathEnum.LOGIN
        },
        {
            component: Registration,
            path: routePathEnum.REGISTRATION
        },
        {
            component: MainPage,
            path: routePathEnum.MAIN_PAGE,
            private: true
        }
    ];
}
