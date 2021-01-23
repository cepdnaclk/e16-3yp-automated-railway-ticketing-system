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
            {/* <Route path="/ProductsAll" exact component={ProductsAll} />
            <Route path="/detail/:id" exact component={DetailProduct} />
            <Route path="/category/:id" exact component={Category} />

            <Route path="/login" exact component={isLogged ? NotFound : Login} />
            <Route path="/register" exact component={isLogged ? NotFound : Register} />

            <Route path="/category" exact component={isAdmin ? Categories : NotFound} />
            <Route path="/create_product" exact component={isAdmin ? CreateProduct : NotFound} />
            <Route path="/edit_product/:id" exact component={isAdmin ? CreateProduct : NotFound} />

            <Route path="/history" exact component={isLogged ? OrderHistory : NotFound} />
            <Route path="/history/:id" exact component={isLogged ? OrderDetails : NotFound} />

            <Route path="/cart" exact component={Cart} /> */}


            <Route path="*" exact component={NotFound} />
        </Switch>
    )
}

export default Pages
