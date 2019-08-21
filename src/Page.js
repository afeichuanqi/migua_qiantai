import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NotFound from './components/pages/NotFound';
import Login from './components/pages/Login';
import { hot } from 'react-hot-loader'

import App from './App';
class Page extends React.Component{
    render(){
        return <Router>
            <Switch>
                <Route exact path="/" render={() => <Redirect to="/app/dashboard/index" push />} />
                <Route path="/app" component={App} />
                <Route path="/404" component={NotFound} />
                <Route path="/login" component={Login} />
                <Route component={NotFound} />
            </Switch>
        </Router>

    }
}
export default hot(module)(Page)