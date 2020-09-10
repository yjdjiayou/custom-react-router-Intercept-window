import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import UserConfirmationTwo from "../components/UserConfirmationTwo";

export default function My() {
    const [text, setText] = useState('');
    const [isBlocking, setIsBlocking] = useState(false);

    return (
        <div>
            <Link to={'/home'}>Go Home</Link>
            <UserConfirmationTwo when={isBlocking}/>
            <div> Page My</div>
            <input type="text"
                   value={text}
                   onChange={(ev) => {
                       const val = ev.target.value;
                       setText(val);
                       setIsBlocking(!!val);
                   }}/>
        </div>
    );
}

