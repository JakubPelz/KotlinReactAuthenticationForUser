import { UserOutlined } from '@ant-design/icons';
import { Button, Form, Modal, Row } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';

import ButtonComponent from 'components/atoms/ButtonComponent';
import InputFieldComponent from 'components/atoms/InputFieldComponent';

import useSetStore from 'hooks/useSetStore';
import useTranslateText from 'hooks/useTranslateText';

import { ILoggedUser, IUpdatePerson, IUser, getUserById, getUsers, putUpdateUserById } from 'services/userService';

import { EErrorCodes } from 'enums/errorCodes';

import FormWrapper from './FormWrapper';
import UsernameInputComponent from './UsernameInputComponent';

interface IChangeUserDetailModal {
    setAllUsers: (allUser: IUser[]) => void;
    loggedUser: ILoggedUser;
}
const ChangeUserDetailModal: React.FC<IChangeUserDetailModal> = ({ setAllUsers, loggedUser }) => {
    const { translateText } = useTranslateText();
    const [open, setOpen] = useState(false);
    const [shake, setShake] = useState(false);
    const { setStore } = useSetStore();
    const [form] = Form.useForm();

    const handleCancel = () => {
        form.resetFields();
        setOpen(false);
    };

    useEffect(() => {
        if (!loggedUser) return;
        form.setFieldsValue({
            name: loggedUser.name,
            username: loggedUser.username
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, loggedUser]);

    const onFinish = (values: Store) => {
        if (!loggedUser) return;
        let data: IUpdatePerson = {
            name: values.name,
            username: values.username,
            password: values.password
        };
        putUpdateUserById(loggedUser.id, data)
            .then(() => {
                getUserById(loggedUser?.id)
                    .then(user => {
                        setStore('loggedUser', user);
                    })
                    .catch((err: AxiosError) => {
                        console.log('JPE err', err);
                    });
                getUsers()
                    .then(users => {
                        setAllUsers(users);
                        handleCancel();
                    })
                    .catch((err: AxiosError) => {
                        console.log('JPE err', err);
                    });
            })
            .catch((err: AxiosError) => {
                console.log('JPE err', err);
                // @ts-ignore
                if (EErrorCodes.ERR002 === err.response?.data?.errorCode) {
                    setShake(true);
                    setTimeout(() => {
                        setShake(false);
                    }, 2000);
                }
            });
    };

    return (
        <>
            <Button
                onClick={() => setOpen(true)}
                icon={<UserOutlined />}
                style={{
                    marginRight: '10px'
                }}
            >
                {translateText('EDIT_PROFILE')}
            </Button>

            <Modal title={translateText('EDIT_PROFILE')} open={open} footer={null} onCancel={handleCancel}>
                <FormWrapper outForm={form} name="control-alias" onFinish={onFinish}>
                    <InputFieldComponent
                        name="name"
                        placeholderKey="NAME"
                        validationKey="VALIDATE_NAME"
                        validate={false}
                    />
                    <UsernameInputComponent shake={shake} validate={false} />
                    <InputFieldComponent
                        name="password"
                        placeholderKey="PASSWORD"
                        validationKey="VALIDATE_PASSWORD"
                        type="password"
                        validate={false}
                    />
                    <InputFieldComponent
                        name="checkPassword"
                        placeholderKey="CHECK_PASSWORD"
                        validationKey="VALIDATE_CHECK_PASSWORD"
                        type="password"
                        validate={false}
                        rules={[
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error(translateText('PASSWORD_NOT_MATCH')));
                                }
                            })
                        ]}
                    />
                    <Form.Item>
                        <Row key="footer-root" justify={'end'}>
                            <ButtonComponent type="default" onClick={handleCancel} buttontext="ZRUSIT" />
                            <ButtonComponent
                                buttontext="POTVRDIT"
                                htmlType="submit"
                                style={{
                                    marginLeft: '15px'
                                }}
                            />
                        </Row>
                    </Form.Item>
                </FormWrapper>
            </Modal>
        </>
    );
};

export default ChangeUserDetailModal;
