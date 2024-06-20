/* eslint-disable camelcase */
import { ConfigProvider } from 'antd';
import cs_CZ from 'antd/lib/locale/cs_CZ';
import React from 'react';
import { Route, RouterProvider, createHashRouter, createRoutesFromElements } from 'react-router-dom';

import './App.less';
import AppRouter from './components/base/AppRouter';
import Store from './components/hoc/Store';

const router = createHashRouter(createRoutesFromElements(<Route path="*" element={<AppRouter />} />));

const App: React.FC = () => {
    return (
        <ConfigProvider
            locale={cs_CZ}
            theme={{
                token: {
                    colorPrimary: '#604CC3',
                    fontSize: 16
                }
            }}
        >
            <Store>
                <RouterProvider router={router} />
            </Store>
        </ConfigProvider>
    );
};

export default App;
