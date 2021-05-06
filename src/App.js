import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './components/Home'
import SignUp from './components/SignUp'

export default function App () {
    return (
        <div className='app'>
            <Router>
                <Navigation/>
                <div className='content'>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/sign-up" component={SignUp}/>
                    </Switch>
                </div>
                <div className='footer' />
            </Router>
        </div>
    )
}
