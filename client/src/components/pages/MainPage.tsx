import { LogoutOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';

import ChangeUserDetailModal from 'components/molecules/ChangeUserDetailModal';

import { useGlobalStore } from 'hooks/useGlobalStore';
import useLocalLogout from 'hooks/useLocalLogout';
import useSetStore from 'hooks/useSetStore';

import { IUser, getUserFromToken, getUsers } from 'services/userService';

const containerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5',
    position: 'relative'
};

const headerStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    width: '100%',
    padding: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)'
};

const userListStyle: React.CSSProperties = {
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    textAlign: 'center',
    maxHeight: '80vh',
    overflowY: 'auto',
    width: '80%',
    margin: '0 auto'
};

const userStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 0',
    borderBottom: '1px solid #eee'
};

const MainPage = () => {
    const { loggedUser, token } = useGlobalStore();
    const [allUsers, setAllUsers] = useState<IUser[]>([]);
    const { localLogout } = useLocalLogout();
    const { setStore } = useSetStore();

    useEffect(() => {
        if (!token) return;
        getUsers()
            .then(users => {
                setAllUsers(users);
            })
            .catch((err: AxiosError) => {
                console.log('JPE err', err);
            });
        getUserFromToken()
            .then(user => {
                setStore('loggedUser', user);
            })
            .catch((err: AxiosError) => {
                console.log('JPE err', err);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    const handleLogout = () => {
        localLogout();
    };

    return (
        <div style={containerStyle}>
            <header style={headerStyle}>
                <div>
                    Username: <strong>{loggedUser?.name}</strong>
                </div>
                <div>
                    {loggedUser && <ChangeUserDetailModal setAllUsers={setAllUsers} loggedUser={loggedUser} />}
                    <Button onClick={handleLogout} icon={<LogoutOutlined />} />
                </div>
            </header>
            <div style={userListStyle}>
                <h2>All Users</h2>
                {allUsers.map(user => (
                    <div key={user.id} style={userStyle}>
                        <p>ID: {user.id}</p>
                        <p>Name: {user.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MainPage;
