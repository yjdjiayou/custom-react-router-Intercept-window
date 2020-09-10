import './App.css';
import React from 'react';
import {BrowserRouter, Switch,Route,Redirect} from 'react-router-dom';
import Home from './views/Home';
import My from './views/My';
import UserConfirmation from "./components/UserConfirmation";

function App() {
    return (
        <div className="App">
            <BrowserRouter
                getUserConfirmation={(message, callback) => {
                  UserConfirmation(message, callback);
                }}
            >
                <Switch>
                    <Route  path={'/home'}  exact component={Home}/>
                    <Route  path={'/my'} exact component={My}/>
                    <Redirect to={'/home'}/>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
