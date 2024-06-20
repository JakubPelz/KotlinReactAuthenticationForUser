import { Select } from 'antd';
import React from 'react';

import { useGlobalStore } from 'hooks/useGlobalStore';
import useSetStore from 'hooks/useSetStore';

import { ELanguageType } from 'enums/languageType';

const { Option } = Select;

const selectStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    width: '65px',
    height: '65px',
    borderRadius: '50%',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: '#fff',
    border: '1px solid #d9d9d9'
};

const optionStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    textAlign: 'center'
};

const Footer: React.FC = () => {
    const { language } = useGlobalStore();
    const { setStore } = useSetStore();

    const handleLanguageChange = (value: ELanguageType) => {
        setStore('language', value);
    };

    return (
        <Select
            value={language}
            onChange={handleLanguageChange}
            style={selectStyle}
            dropdownStyle={{
                borderRadius: '10px'
            }}
            bordered={false}
        >
            <Option value={ELanguageType.CZ} style={optionStyle}>
                CZ
            </Option>
            <Option value={ELanguageType.EN} style={optionStyle}>
                EN
            </Option>
        </Select>
    );
};

export default Footer;
