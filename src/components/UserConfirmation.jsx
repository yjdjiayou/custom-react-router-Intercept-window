import React from 'react';
import ReactDOM from 'react-dom';
import {Modal} from 'antd';

const container = document.createElement('div');
const UserConfirmation = (payload, callback) => {
    const {action, location, curHref, message} = JSON.parse(payload);

    /**
     * 弹窗关闭事件回调
     * @param callbackState
     */
    const handlerModalClose = (callbackState) => {
        ReactDOM.unmountComponentAtNode(container);

        // callback 接收的参数，如果值为假，那么 history 库内部就不会去更新 location 值，路由也就不会切换
        callback(callbackState);

        if (!callbackState && action === 'POP') {
            window.history.replaceState(null, null, curHref);
        }
    };

    ReactDOM.render(
        <Modal
            visible={true}
            onCancel={() => handlerModalClose(false)}
            onOk={() => handlerModalClose(true)}
            title="Warning"
        >
            {message}
        </Modal>,
        container,
    );
};
export default UserConfirmation;
