import { Form } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { AxiosError } from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonComponent from 'components/atoms/ButtonComponent';
import InputFieldComponent from 'components/atoms/InputFieldComponent';
import Title from 'components/atoms/Title';
import FormWrapper from 'components/molecules/FormWrapper';

import useSetStore from 'hooks/useSetStore';

import { ITokens, IUserLoginData, postTokens } from 'services/tokenService';
import { getUserByUsername } from 'services/userService';

import routePathEnum from 'enums/routePathEnum';

const { Item } = Form;

const containerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f2f5'
};

const boxStyle: React.CSSProperties = {
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    textAlign: 'center'
};

const buttonStyle: React.CSSProperties = {
    marginTop: '20px',
    width: '100%'
};

const buttonWithMarginStyle: React.CSSProperties = {
    ...buttonStyle,
    marginBottom: '-10px'
};

const Login: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { setStore } = useSetStore();

    const onFinish = (values: Store) => {
        let data: IUserLoginData = {
            username: values.username,
            password: values.password
        };
        postTokens(data)
            .then((response: ITokens) => {
                setStore('token', response.accessToken);
                sessionStorage.setItem('refreshToken', response.refreshToken);
                navigate(routePathEnum.MAIN_PAGE);
                getUserByUsername(values.username, response.accessToken)
                    .then(loggedUser => {
                        setStore('loggedUser', loggedUser);
                        setStore('token', response.accessToken);
                        sessionStorage.setItem('refreshToken', response.refreshToken);
                        navigate(routePathEnum.MAIN_PAGE);
                    })
                    .catch((err: AxiosError) => {
                        console.log('JPE err', err);
                    });
                navigate(routePathEnum.MAIN_PAGE);
            })
            .catch((err: AxiosError) => {
                console.log('JPE err', err);
            });
    };

    return (
        <div style={containerStyle}>
            <div style={boxStyle}>
                <Title text={'LOGIN'} level={2} />
                <FormWrapper outForm={form} name="control-alias" onFinish={onFinish}>
                    <InputFieldComponent name="username" placeholderKey="USERNAME" validationKey="VALIDATE_USERNAME" />

                    <InputFieldComponent
                        name="password"
                        placeholderKey="PASSWORD"
                        validationKey="VALIDATE_PASSWORD"
                        type="password"
                    />
                    <Item>
                        <ButtonComponent htmlType="submit" style={buttonWithMarginStyle} />
                    </Item>

                    <Item
                        style={{
                            marginTop: '-20px'
                        }}
                    >
                        <ButtonComponent
                            type="default"
                            onClick={() => navigate(routePathEnum.DEFAULT_PAGE)}
                            style={buttonStyle}
                            buttontext="ZPET"
                        />
                    </Item>
                </FormWrapper>
            </div>
        </div>
    );
};

export default Login;
