import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router';
import {Modal} from 'antd';

export default function UserConfirmationTwo(props) {
    const {when = false} = props;
    const [isShowModal, setIsShowModal] = useState(false);
    const history = useHistory();
    const [nextLocation, setNextLocation] = useState(null);
    const [action, setAction] = useState();
    const [unblock, setUnblock] = useState(null);

    useEffect(() => {
        if (!when || unblock) {
            return;
        }
        const cancel = history.block((nextLocation, action) => {
            if (when) {
                setIsShowModal(true);
            }
            setNextLocation(nextLocation);
            setAction(action);
            return false;
        });
        setUnblock(() => {
            return cancel;
        });
    }, [when, unblock]);

    useEffect(() => {
        return () => {
            unblock && unblock();
        };
    }, []);

    function onConfirm() {
        unblock && unblock();
        if (action === 'PUSH') {
            history.push(nextLocation);
        } else if (action === 'POP') {
            history.goBack();
        } else if (action === 'REPLACE') {
            history.replace(nextLocation);
        }
        setIsShowModal(false);
    }

    function onCancel() {
        setIsShowModal(false);
    }

    return (
        <>
            {isShowModal && <Modal
                title="Warning"
                visible={true}
                onOk={onConfirm}
                onCancel={onCancel}
            >
                <div>
                    Are you sure you want to go to {nextLocation && nextLocation.pathname}
                </div>
            </Modal>}
        </>
    );
}
