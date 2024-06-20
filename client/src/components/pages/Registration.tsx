import { Form } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonComponent from 'components/atoms/ButtonComponent';
import InputFieldComponent from 'components/atoms/InputFieldComponent';
import Title from 'components/atoms/Title';
import FormWrapper from 'components/molecules/FormWrapper';
import UsernameInputComponent from 'components/molecules/UsernameInputComponent';

import useTranslateText from 'hooks/useTranslateText';

import { ICreateUser, postCreateUser } from 'services/userService';

import { EErrorCodes } from 'enums/errorCodes';
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

const Registration: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [shake, setShake] = useState(false);
    const { translateText } = useTranslateText();

    const onFinish = (values: Store) => {
        let data: ICreateUser = {
            name: values.name,
            username: values.username,
            password: values.password
        };
        postCreateUser(data)
            .then(() => {
                navigate(routePathEnum.LOGIN);
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
        <div style={containerStyle}>
            <div style={boxStyle}>
                <Title text={'REGISTRACE'} level={2} />
                <FormWrapper outForm={form} name="control-alias" onFinish={onFinish}>
                    <InputFieldComponent name="name" placeholderKey="NAME" validationKey="VALIDATE_NAME" />
                    <UsernameInputComponent shake={shake} />
                    <InputFieldComponent
                        name="password"
                        placeholderKey="PASSWORD"
                        validationKey="VALIDATE_PASSWORD"
                        type="password"
                    />
                    <InputFieldComponent
                        name="checkPassword"
                        placeholderKey="CHECK_PASSWORD"
                        validationKey="VALIDATE_CHECK_PASSWORD"
                        type="password"
                        rules={[
                            {
                                required: true,
                                message: translateText('VALIDATE_CHECK_PASSWORD')
                            },
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

                    <Item>
                        <ButtonComponent htmlType="submit" style={buttonWithMarginStyle} buttontext="POTVRDIT" />
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

export default Registration;
