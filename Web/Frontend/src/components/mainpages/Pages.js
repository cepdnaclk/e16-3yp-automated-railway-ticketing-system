import React, {useContext} from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'
import NotFound from './utils/not_found/NotFound'
import {GlobalState} from '../../GlobalState'
import Profile from '../mainpages/Profile/Profile'
import HomePage from '../mainpages/Homepage/Homepage'
import Travels from '../mainpages/Travels/Travels'
import Main from '../mainpages/customer/Main'
import Customer from '../mainpages/customer/Customer'
import User from '../mainpages/User/User'
import Uncom from '../mainpages/uncomTravel/UncomTravel'
import Freezed from '../mainpages/uncomTravel/FreezedAccount'
import Trains from '../mainpages/trains/Trains'
import CreateTrain from '../mainpages/trains/CreateTrain'
import Stations from '../mainpages/stations/Stations'
import CreateStation from '../mainpages/stations/CreateStation'
import Payments from '../mainpages/Payment/Payments'
import CreatePayment from '../mainpages/Payment/CreatePayment'
import Increase from '../mainpages/ChangePrice/Increase'
import Decrease from '../mainpages/ChangePrice/Decrease'

function Pages() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin



    return (
        <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/login" exact component={isLogged ? NotFound : Login} />
            <Route path="/register" exact component={isLogged ? NotFound : Register} />
            <Route path="/profile" exact component={isLogged ? Profile: NotFound} />
            <Route path="/travels" exact component={isLogged ? Travels : NotFound} />
            <Route path="/customer" exact component={isAdmin ? Main : NotFound} />
            <Route path="/customer/update/:Id" exact component={isAdmin ? Customer : NotFound} />
            <Route path="/customer/register" exact component={isAdmin ? Customer : NotFound} />
            <Route path="/user" exact component={isAdmin ? User : NotFound} />
            <Route path="/uncomTravel" exact component={isAdmin ? Uncom : NotFound} />
            <Route path="/removeFreez" exact component={isAdmin ? Freezed : NotFound} />
            <Route path="/trains" exact component={isAdmin ? Trains : NotFound} />
            <Route path="/createTrain" exact component={isAdmin ? CreateTrain : NotFound} />
            <Route path="/createTrain/:Id" exact component={isAdmin ? CreateTrain : NotFound} />
            <Route path="/stations" exact component={isAdmin ? Stations : NotFound} />
            <Route path="/createStation" exact component={isAdmin ? CreateStation : NotFound} />
            <Route path="/createStation/:Id" exact component={isAdmin ? CreateStation : NotFound} />
            <Route path="/payments" exact component={isLogged ? Payments : NotFound} />
            <Route path="/createPayment" exact component={isAdmin ? CreatePayment : NotFound} />
            <Route path="/createPayment/:Id" exact component={isAdmin ? CreatePayment : NotFound} />
            <Route path="/increase" exact component={isAdmin ? Increase : NotFound} />
            <Route path="/decrease" exact component={isAdmin ? Decrease : NotFound} />

            <Route path="*" exact component={NotFound} />
        </Switch>
    )
}

export default Pages
