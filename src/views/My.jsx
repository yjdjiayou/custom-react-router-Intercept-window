import React, {useState, useEffect, useCallback} from 'react';
import {Link} from 'react-router-dom';
import eventCenter from '../utils/events';
import {Modal} from "antd";
import {useHistory} from "react-router";

function useMonitorBlocked(callback) {
    useEffect(() => {
        eventCenter.on('blocked', callback);
    }, [callback]);

    useEffect(() => {
        return () => {
            eventCenter.removeListener('blocked', callback);
        }
    }, [callback]);
}

export default function My() {
    const [text, setText] = useState('');
    const [isShowModal, setIsShowModal] = useState(false);
    const history = useHistory();

    const callback = useCallback((options) => {
        if (options.blocked) {
            setIsShowModal(true);
        }
    }, []);
    useMonitorBlocked(callback);

    function handlerInputChange(ev) {
        const val = ev.target.value;
        setText(val);
        history.canLeave = false;
    }

    function onConfirm() {
        const action = history.curAction;
        const path = history.curHref;
        const state = history.curState;
        history.canLeave = true;
        if (action === 'PUSH') {
            history.push(path, state);
        } else if (action === 'REPLACE') {
            history.replace(path, state);
        }
        setIsShowModal(false);
    }

    function onCancel() {
        setIsShowModal(false);
    }

    return (
        <div>
            <Link to={'/home'}>Go Home</Link>

            <div> Page My</div>

            <input type="text"
                   value={text}
                   onChange={handlerInputChange}/>

            {isShowModal && <Modal
                title="Warning"
                visible={true}
                onOk={onConfirm}
                onCancel={onCancel}
            >
                <div>
                    Are you sure you want to go to ${history.curHref}
                </div>
            </Modal>}
        </div>
    );
}

