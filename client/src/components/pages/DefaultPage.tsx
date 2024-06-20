import { Col, Space } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonComponent from 'components/atoms/ButtonComponent';
import Title from 'components/atoms/Title';

import routePathEnum from 'enums/routePathEnum';

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
    margin: '10px'
};

const DefaultPage: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div style={containerStyle}>
            <div style={boxStyle}>
                <Space>
                    <Col>
                        <Title text={'LOGIN_DONT_HAVE_ACC'} level={5} />
                        <ButtonComponent
                            buttontext="REGISTRACE"
                            style={buttonStyle}
                            onClick={() => navigate(routePathEnum.REGISTRATION)}
                        />
                    </Col>
                    <Col>
                        <Title text={'LOGIN_HAVE_ACC'} level={5} />
                        <ButtonComponent
                            style={buttonStyle}
                            type="default"
                            onClick={() => navigate(routePathEnum.LOGIN)}
                        />
                    </Col>
                </Space>
            </div>
        </div>
    );
};

export default DefaultPage;
