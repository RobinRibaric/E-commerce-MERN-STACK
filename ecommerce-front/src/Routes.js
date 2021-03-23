import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import UserDashboard from './user/UserDashboard';
import AdminDashboard from './user/AdminDashboard';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';

import SignIn from './user/SignIn';
import SignUp from './user/SignUp';
import Home from './core/Home';
import Shop from './core/Shop';
import Product from './core/Product';


const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/shop' exact component={Shop} />
                <Route path='/product/:productId' exact component={Product} />
                <Route path='/signin' exact component={SignIn} />
                <Route path='/signup' exact component={SignUp} />
                <PrivateRoute path='/user/dashboard' exact component={UserDashboard} />
                <AdminRoute path='/admin/dashboard' exact component={AdminDashboard} />
                <AdminRoute path='/create/category' exact component={AddCategory} />
                <AdminRoute path='/create/product' exact component={AddProduct} />
            </Switch>
        </Router>
    )
}

export default Routes;


