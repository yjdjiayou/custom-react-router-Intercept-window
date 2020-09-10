import React from 'react';
import {Link, useHistory} from 'react-router-dom';

export default function Home(props) {
    return (
        <div>
            <Link to={'/my'}>Go My</Link>
            <div> Page Home </div>
        </div>
    );
}

