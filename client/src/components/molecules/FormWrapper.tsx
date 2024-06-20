import { Form, Row } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { Store } from 'antd/lib/form/interface';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import React from 'react';

interface IFormWrapper {
    layoutPosition?: 'vertical' | 'horizontal' | 'inline';
    onFinish: (values: Store) => void;
    onFinishFailed?: (errorInfo: ValidateErrorEntity) => void;
    outForm?: FormInstance;
    name?: string;
    preserve?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onValuesChange?: (changedValues: any, allValues: any) => void;
    scrollToFirstError?: boolean;
    requiredMark?: boolean;
    children?: React.ReactNode;
}

const FormWrapper: React.FC<IFormWrapper> = props => {
    const [form] = Form.useForm();
    const {
        onFinish,
        children,
        layoutPosition = 'vertical',
        onFinishFailed,
        outForm,
        name = 'login',
        preserve,
        requiredMark,
        ...rest
    } = props;
    const layout =
        layoutPosition === 'horizontal'
            ? {
                  labelCol: {
                      span: 6
                  },
                  wrapperCol: {
                      span: 18
                  }
              }
            : {
                  labelCol: {
                      span: 24
                  }
              };
    return (
        <Row justify="start">
            <Form
                labelAlign={layoutPosition === 'horizontal' ? 'left' : 'right'}
                {...layout}
                colon={false}
                layout={layoutPosition}
                form={outForm ? outForm : form}
                scrollToFirstError={true}
                name={name}
                preserve={preserve}
                initialValues={{
                    remember: true
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                style={{
                    width: '100%'
                }}
                requiredMark={requiredMark}
                {...rest}
            >
                {children}
            </Form>
        </Row>
    );
};

export default FormWrapper;
