import { Typography } from 'antd';
import { TextProps } from 'antd/lib/typography/Text';
import React from 'react';

import useTranslateText from '../../hooks/useTranslateText';

const Text = Typography.Text;

interface IParagraph extends TextProps {
    text: string;
}

const Paragraph: React.FC<IParagraph> = props => {
    const { translateText } = useTranslateText();
    return <Text {...props}>{translateText(props.text)}</Text>;
};

export default Paragraph;
