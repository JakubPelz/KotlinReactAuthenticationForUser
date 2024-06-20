import { Typography } from 'antd';
import { TitleProps } from 'antd/lib/typography/Title';
import React, { CSSProperties } from 'react';

import useTranslateText from '../../hooks/useTranslateText';

const TitleAnt = Typography.Title;

const titleStyle: React.CSSProperties = {
    marginTop: '0.2rem'
};

interface ITitle extends TitleProps {
    text: string;
    level: 1 | 2 | 3 | 4 | 5;
    style?: CSSProperties;
}

const Title: React.FC<ITitle> = props => {
    const { translateText } = useTranslateText();
    return (
        <TitleAnt
            {...props}
            level={props.level}
            style={{
                ...titleStyle,
                ...props.style
            }}
        >
            {translateText(props.text)}
        </TitleAnt>
    );
};

export default Title;
