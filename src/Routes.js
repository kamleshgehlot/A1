import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom'; // Helpers
import { APP_TOKEN } from './api/Constants';
// Utils
import PageLoader from './modules/common/PageLoader';
import Franchise from './modules/auth/franchise/Franchise';
import CategoryList from './modules/auth/category/CategoryList';

// Routes
const AuthLayout = lazy(() => import('./modules/auth/layout/MainLayout'));
const LoginPage = lazy(() => import('./modules/public/login/LoginPage'));
const NoMatchPage = lazy(() => import('./modules/not-found/NoMatchPage'));
// import Category from './modules/auth/category/Category';
const Routes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <AuthLayout>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/login" />} />
          <Route
            exact
            path="/login"
            render={props => {
              return APP_TOKEN.notEmpty ? <Redirect to="/auth" /> : <LoginPage {...props} />;
            }}
          />
          <Route
            path="/auth"
            render={props => {
              return APP_TOKEN.notEmpty ? <AuthLayout {...props} /> : <Redirect to="/login" />;
              // return <AuthLayout {...props} />;
            }}
          />
          <Route path="/franchise" component={Franchise} />
          <Route path="/category" component={CategoryList} />
          {/* <Route path="/category" component={Category} /> */}
          <Route component={NoMatchPage} />
        </Switch>
      </AuthLayout>
    </Suspense>
  );
};

Routes.propTypes = {
  location: PropTypes.object, // React Router Passed Props
};

export default Routes;
