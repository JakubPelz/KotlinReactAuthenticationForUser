import { Form, Input } from 'antd';
import React from 'react';

import useTranslateText from 'hooks/useTranslateText';

const { Item } = Form;

interface IUsernameInputComponent {
    shake: boolean;
    validate?: boolean;
}

const UsernameInputComponent: React.FC<IUsernameInputComponent> = ({ shake, validate = true }) => {
    const { translateText } = useTranslateText();

    return (
        <Item
            name="username"
            className={shake ? 'shake' : ''}
            rules={
                validate
                    ? [
                          {
                              required: true,
                              message: translateText('VALIDATE_USERNAME')
                          }
                      ]
                    : []
            }
        >
            <Input
                placeholder={translateText('USERNAME')}
                style={
                    shake
                        ? {
                              color: 'red'
                          }
                        : undefined
                }
            />
        </Item>
    );
};

export default UsernameInputComponent;
