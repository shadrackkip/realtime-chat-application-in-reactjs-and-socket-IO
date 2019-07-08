import React, { Component } from 'react'
import { Switch ,Route} from 'react-router-dom'
import Layout from './hoc/Layout';
import Login from './components/Login/Login';
import Home from './components/Home/Home';

export class Routes extends Component {
    render() {
        return (
            <Layout title="React Chat App">
                <Switch>
                    <Route path="/" exact component={Login}/>
                    <Route path="/home" exact component={Home}/>
                    <Route path="/home/:uuid" exact component={Home}/>
                </Switch>
            </Layout>
        )
    }
}

export default Routes
