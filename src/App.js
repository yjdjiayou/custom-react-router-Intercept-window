import './App.css';
import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Home from './views/Home';
import My from './views/My';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route path={'/home'} exact component={Home}/>
                    <Route path={'/my'} exact component={My}/>
                    <Redirect to={'/home'}/>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
