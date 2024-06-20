import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import React from 'react';

import useTranslateText from 'hooks/useTranslateText';

interface IButtonComponent extends ButtonProps {
    buttontext?: string;
    icon?: React.ReactNode;
    htmlType?: 'button' | 'submit' | 'reset';
    loading?: boolean;
    extramessage?: string;
    type?: 'text' | 'link' | 'primary' | 'default' | 'dashed' | undefined;
    onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    id?: string;
}

const ButtonComponent: React.FC<IButtonComponent> = props => {
    const { translateText } = useTranslateText();
    const {
        buttontext = 'PRIHLASIT_SE',
        icon,
        htmlType = 'button',
        type = 'primary',
        loading,
        /*        extramessage, */
        onClick,
        id
    } = props;

    return (
        /*     <Form.Item
            extra={extramessage ? <Paragraph text={extramessage} className="extramessage-text" /> : null}
            style={{
                maxWidth: 650
            }}
        > */
        <Button
            type={type}
            icon={icon}
            onClick={onClick}
            htmlType={htmlType}
            loading={loading}
            className="antd-button"
            id={id}
            {...props}
        >
            <span
                style={
                    icon
                        ? {
                              paddingLeft: 6
                          }
                        : {}
                }
            >
                {translateText(buttontext)}
            </span>
        </Button>
        /*        </Form.Item> */
    );
};

export default ButtonComponent;
