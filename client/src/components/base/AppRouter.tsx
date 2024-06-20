import Spin from 'antd/lib/spin';
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Authorization } from 'components/hoc/Authorization';
import PrivateRoute from 'components/hoc/PrivateRoute';
import NotFound from 'components/pages/NotFound';

import { routeMapa } from 'data/routeMapa';

const AppRouter: React.FC = () => {
    return (
        <>
            <Routes>
                <Route>
                    <Route element={<Authorization />}>
                        <Route path={'*'} element={<NotFound />} />
                        {routeMapa().map((route, index) => {
                            const RouteComponent = route.component;
                            const Component = (
                                <Suspense
                                    fallback={
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                height: '100vh'
                                            }}
                                        >
                                            <Spin size="large" />
                                        </div>
                                    }
                                >
                                    <RouteComponent />
                                </Suspense>
                            );

                            return route.private ? (
                                <Route key={index}>
                                    <Route path={route.path} element={<PrivateRoute element={Component} />} />
                                </Route>
                            ) : (
                                <Route key={index}>
                                    <Route path={route.path} element={Component} />
                                </Route>
                            );
                        })}
                    </Route>
                </Route>
            </Routes>
        </>
    );
};

export default AppRouter;
