import './App.css';
import React, {useEffect} from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import {useHistory} from "react-router";
import getNewHistory from "./utils/history-extension";
import Home from './views/Home';
import My from './views/My';

function EmptyComponent() {
    const history = useHistory();
    useEffect(() => {
        getNewHistory(history);
    }, [history]);
    return null;
}

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route path={'/home'} exact component={Home}/>
                    <Route path={'/my'} exact component={My}/>
                    <Redirect to={'/home'}/>
                </Switch>
                <EmptyComponent />
            </BrowserRouter>
        </div>
    );
}

export default App;
