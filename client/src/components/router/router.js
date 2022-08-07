import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";

// Components
import HomePage from "components/pages/home-page/";
import ProductionItemPage from "components/pages/production-item-page";

// data
import data from "js/assets/data.js";

const Router = () => (
    <Switch>
        <Route path="/" exact>
            <HomePage />
        </Route>
        <Route path="/production/:art">
            <ProductionItemPage />
        </Route>
        {
            data.menuItems.map(item => <Route path={`${item.href}`} key={item.href} >
                <item.component />
            </Route>)
        }
        <Redirect to="/" />
    </Switch>
)

export default Router;
