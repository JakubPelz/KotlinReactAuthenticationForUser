import { InfoCircleOutlined } from '@ant-design/icons';
import { notification } from 'antd';
import React from 'react';

import { ENotificationPlacement } from 'enums/notificationPlacement';
import { ENotificationType } from 'enums/notificationType';

import getLanguageObject from 'utils/getLanguageObject';

interface INotification {
    type?: ENotificationType;
    title: string;
    description: string;
    duration?: number;
    placement?: ENotificationPlacement;
    onClick?: () => void;
    key?: string;
    lang?: string;
}

const NotificationComponent = (props: INotification) => {
    const {
        type = ENotificationType.OPEN,
        title,
        description,
        duration = 4.5,
        placement = ENotificationPlacement.TOPRIGHT,
        onClick,
        key,
        lang = 'cz'
    } = props;

    const textTranslation = (text: string) => {
        return getLanguageObject(lang)[text] || text;
    };

    /* Open: */
    if (type === ENotificationType.OPEN)
        return notification.open({
            key: key,
            message: textTranslation(title),
            description: textTranslation(description),
            duration: duration,
            placement: placement,
            onClick: () => {
                onClick && onClick();
                notification.destroy();
            }
        });
    /* Success: */
    if (type === ENotificationType.SUCCESS)
        return notification.success({
            key: key,
            message: textTranslation(title),
            description: textTranslation(description),
            duration: duration,
            placement: placement,
            onClick: () => {
                onClick && onClick();
                notification.destroy();
            }
        });
    /* Error: */
    if (type === ENotificationType.ERROR)
        return notification.error({
            key: key,
            message: textTranslation(title),
            description: textTranslation(description),
            duration: duration,
            placement: placement,
            onClick: () => {
                onClick && onClick();
                notification.destroy();
            }
        });
    /* Info: */
    if (type === ENotificationType.INFO)
        return notification.info({
            key: key,
            message: textTranslation(title),
            description: textTranslation(description),
            duration: duration,
            icon: (
                <InfoCircleOutlined
                    style={{
                        color: 'green'
                    }}
                />
            ),
            placement: placement,
            onClick: () => {
                // key && notification.close(key);
                onClick && onClick();
                notification.destroy(); // zavře notifikaci po kliknutí na ni
            }
        });
    /* Warning: */
    if (type === ENotificationType.WARNING)
        return notification.warning({
            key: key,
            message: textTranslation(title),
            description: textTranslation(description),
            duration: duration,
            placement: placement,
            onClick: () => {
                // key && notification.close(key);
                onClick && onClick();
                notification.destroy(); // zavře notifikaci po kliknutí na ni
            }
        });
};

export default NotificationComponent;
