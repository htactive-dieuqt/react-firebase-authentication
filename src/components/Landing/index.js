import React from 'react'
import Header from './header'
import Footer from './footer'

import SignIn from '../SignIn/index'
import SignUp from '../SignUp/index'

import User from '../Users/userprofile'
import ProductList from '../ProductList/index'
import ProductDetail from '../ProductList/ProductDetail'
import CartItem from '../ProductList/CartItem'

import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navigation from '../Navigation'

const Landing = () => (
  <>
    <BrowserRouter>
      <div className="App">
        {/* <div> <Header /></div> */}

        {/* <div><Navigation/></div> */}
        {/* <div>
          <Switch>
            <Route exact path='/' component={ProductList}></Route>
            <Route path='/singin-account' component={SignIn}></Route>
            <Route path='/singup-account' component={SignUp}></Route>
            <Route path='/user-detail' component={User} />
            <Route path='/product-detail/:id' component={ProductDetail}></Route>
            <Route path='/cart-item/' component={CartItem}></Route>
          </Switch>
        </div> */}

        <div><Footer /></div>

      </div>
    </BrowserRouter>
  </>
);

export default Landing;
