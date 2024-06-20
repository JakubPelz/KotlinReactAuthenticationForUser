import { Form, Input } from 'antd';
import { Rule } from 'antd/lib/form';
import React from 'react';

import useTranslateText from 'hooks/useTranslateText';

const { Item } = Form;

interface InputFieldProps {
    name: string;
    placeholderKey: string;
    validationKey: string;
    type?: 'text' | 'password';
    rules?: Rule[];
    validate?: boolean;
}

const InputFieldComponent: React.FC<InputFieldProps> = ({
    name,
    placeholderKey,
    validationKey,
    type = 'text',
    rules = [],
    validate = true
}) => {
    const { translateText } = useTranslateText();

    const defaultRules: Rule[] = validate
        ? [
              {
                  required: true,
                  message: translateText(validationKey)
              }
          ]
        : [];

    const mergedRules = [...defaultRules, ...rules];

    return (
        <Item name={name} rules={mergedRules}>
            {type === 'password' ? (
                <Input.Password placeholder={translateText(placeholderKey)} />
            ) : (
                <Input placeholder={translateText(placeholderKey)} />
            )}
        </Item>
    );
};

export default InputFieldComponent;
