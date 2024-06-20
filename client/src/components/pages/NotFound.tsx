import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import Paragraph from 'components/atoms/Paragraph';
import Title from 'components/atoms/Title';

import useTranslateText from 'hooks/useTranslateText';

import routePathEnum from 'enums/routePathEnum';

interface ILogin {}

const NotFound: React.FC<ILogin> = () => {
    const navigate = useNavigate();
    const { translateText } = useTranslateText();
    return (
        <>
            <Title text="NOTFOUND_TITLE" level={5} />
            <Paragraph
                text="NOTFOUND_TEXT"
                style={{
                    paddingTop: 10,
                    display: 'block'
                }}
            />
            <div
                style={{
                    display: 'block',
                    paddingTop: 40
                }}
            >
                <Button
                    style={{
                        marginRight: 20
                    }}
                    type="primary"
                    onClick={() => navigate(routePathEnum.LOGIN)}
                >
                    {translateText('PRIHLASIT_SE')}
                </Button>
            </div>
        </>
    );
};

export default NotFound;
