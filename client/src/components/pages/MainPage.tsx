import { DeleteOutlined, ExclamationCircleOutlined, LogoutOutlined } from '@ant-design/icons';
import { Button, Modal, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';

import ChangeUserDetailModal from 'components/molecules/ChangeUserDetailModal';

import { useGlobalStore } from 'hooks/useGlobalStore';
import useLocalLogout from 'hooks/useLocalLogout';
import useSetStore from 'hooks/useSetStore';
import useTranslateText from 'hooks/useTranslateText';

import { IUser, deleteUserById, getUserFromToken, getUsers } from 'services/userService';

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

const MainPage = () => {
    const { loggedUser, token } = useGlobalStore();
    const [allUsers, setAllUsers] = useState<IUser[]>([]);
    const { localLogout } = useLocalLogout();
    const { translateText } = useTranslateText();
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

    const handleDelete = (userId: number) => {
        deleteUserById(userId)
            .then(() => {
                getUsers()
                    .then(users => {
                        setAllUsers(users);
                    })
                    .catch((err: AxiosError) => {
                        console.log('JPE err', err);
                    });
            })
            .catch((err: AxiosError) => {
                console.log('JPE err', err);
            });
    };

    const confirmDelete = (userId: number) => {
        Modal.confirm({
            title: translateText('CONFIRM_DELETE_TITLE'),
            icon: <ExclamationCircleOutlined />,
            content: translateText('CONFIRM_DELETE_CONTENT'),
            okText: translateText('POTVRDIT'),
            cancelText: translateText('ZRUSIT'),
            onOk() {
                handleDelete(userId);
            }
        });
    };

    const columns: ColumnsType<IUser> = [
        {
            title: translateText('ID'),
            dataIndex: 'id',
            key: 'id',
            align: 'center' as 'center'
        },
        {
            title: translateText('NAME'),
            dataIndex: 'name',
            key: 'name',
            align: 'center' as 'center'
        },
        {
            title: translateText('USERNAME'),
            dataIndex: 'username',
            key: 'username',
            align: 'center' as 'center'
        },
        {
            title: translateText('DELETE_USER'),
            key: 'action',
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            render: (_: any, record: IUser) => (
                <Button type="text" icon={<DeleteOutlined />} onClick={() => confirmDelete(record.id)} />
            ),
            align: 'center' as 'center'
        }
    ];

    return (
        <div style={containerStyle}>
            <header style={headerStyle}>
                <div>
                    {translateText('NAME')}: <strong>{loggedUser?.name}</strong>
                </div>
                <div>
                    {loggedUser && token && (
                        <ChangeUserDetailModal setAllUsers={setAllUsers} loggedUser={loggedUser} token={token} />
                    )}
                    <Button onClick={handleLogout} icon={<LogoutOutlined />} />
                </div>
            </header>
            <div style={userListStyle}>
                <h2>{translateText('ALL_USERS')}</h2>
                <Table
                    columns={columns}
                    dataSource={allUsers}
                    rowKey="id"
                    pagination={false}
                    style={{
                        textAlign: 'center'
                    }}
                />
            </div>
        </div>
    );
};

export default MainPage;
