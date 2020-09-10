import eventCenter from './events';

export default function getNewHistory(history) {
    if (history.extended) {
        return;
    }
    history.extended = true;
    history.canLeave = true;
    history.curHref = '';
    history.curState = null;
    history.curAction = 'POP';

    let oldPush = history.push;
    history.push = (path, state) => {
        history.curHref = path;
        history.curState = state;
        history.curAction = 'PUSH';
        if (!history.canLeave) {
            eventCenter.emit('blocked', {
                blocked: true,
            });
            return;
        }
        oldPush(path, state);
    };

}
