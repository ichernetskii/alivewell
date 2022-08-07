// Polyfills
import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
import "intersection-observer";
import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();

// React
import React, {Suspense} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router} from "react-router-dom";

// Redux
import {Provider} from "react-redux";
import store from "../store";

// Components
const App = React.lazy(() => import("components/app"));
import Loader from "components/loader";

// SCSS
import "style/global.scss";
import "style/fonts.scss";

ReactDOM.render(<Suspense fallback={ <Loader /> }>
    <Router basename={`${process.env.BASE_PATH}`}>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>
</Suspense>, document.getElementById("root"));
