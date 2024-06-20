import React from 'react';
import { Navigate, RouteProps } from 'react-router-dom';

/** Privátní cesta pro kontrolu přihlášení (token) */
const PrivateRoute: React.FC<RouteProps> = ({ element }) => {
    const refreshToken = sessionStorage.getItem('refreshToken');
    return <>{refreshToken ? element : <Navigate to={'/'} />}</>;
};

export default PrivateRoute;
